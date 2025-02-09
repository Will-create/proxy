const BUFFER_INIT = Buffer.alloc(1);
BUFFER_INIT.writeUInt8(0);

const BUFFER_DATA = Buffer.alloc(1);
BUFFER_DATA.writeUInt8(1);

const BUFFER_END = Buffer.alloc(1);
BUFFER_END.writeUInt8(2);

var Messages = 0;
var Client = null;
var Pending = {};

exports.install = function() {
	PROXY('/', proxy).check(ctrl => ctrl.method !== 'SOCKET');
	ROUTE('SOCKET / @binary <100MB', socket);
};

function log() {
	let arr = [new Date().format('yyyy-MM-dd HH:mm:ss')];

	for (let index in arguments)
		arr.push(arguments[index]);

	console.log.apply(console, arr);
}

// Handles communication between the server and proxy client
function socket($) {

	$.autodestroy();

	$.on('open', function(client) {
		if (Client) {
			let err = 'Proxy client is already in use';
			log('[OK]', err);
			Client.close(4001, err);
		} else {
			log('[OK]', 'Proxy client is connected');
			Client = client;
		}
	});

	$.on('close', function(client) {
		if (Client == client) {
			Client = null;
			log('[NO]', 'Proxy client is disconnected.');
		}
	});

	$.on('message', function(client, msg) {

		let id = msg.readInt32BE(1);
		let type = msg.readInt8(0);
		let data = msg.slice(5);
		let ctrl = Pending[id];

		switch (type) {
			case 0: // init
				let tmp = JSON.parse(data.toString('utf8'));
				ctrl.res.writeHead(tmp.status, tmp.headers);
				break;
			case 1: // data
				ctrl.res.write(data);
				break;
			case 2: // end
				delete Pending[id];
				ctrl.res.end();
				break;
			case 3: // error
				delete Pending[id];
				ctrl.res.end();
				break;
			case 4: // abort
				delete Pending[id];
				ctrl.res.end();
				break;
		}

	});
}

// Handles communication between the client and proxy server
function proxy(ctrl) {

	if (!Client) {
		ctrl.invalid('Not yet available.');
		return;
	}

	var obj = {};
	obj.headers = ctrl.req.headers;
	obj.url = ctrl.req.url;
	obj.method = ctrl.req.method;
	obj.ip = ctrl.ip;

	let buffer = Buffer.from(JSON.stringify(obj), 'utf8');
	let id = Buffer.alloc(4);
	let index = Messages++;

	// For answer
	Pending[index] = ctrl;

	// Write request id
	id.writeUInt32BE(index);

	// Sent initial data
	Client.send(Buffer.concat([BUFFER_INIT, id, buffer]));

	// Send data
	ctrl.req.on('data', chunk => Client.send(Buffer.concat([BUFFER_DATA, id, chunk])));

	// Send empty buffer
	ctrl.req.on('end', () => Client.send(Buffer.concat([BUFFER_END, id])));
}