# Total.js Proxy (BETA)

> It's a simple NGROK alternative.

This repository contains two apps that can make a proxy between localhost and a domain on your server. All communication is via the WebSocket. The client app connects to the server application through the WebSocket.

__Functionality__:

- [x] HTTP requests
- [ ] WebSocket (is not supported)

__Requirements__

- Node.js Platform `+19`
- Total.js v5 framework `$ npm install total5`

## Server

The server app must be hosted on your server and must be available via HTTP protocol because the client will connect to it via WebSocket.

__Installation__:

- install Node.js Platform
- install dependencies:

```sh
cd server
npm install
npm start
# or run it via: node index.js
```

## Client

The client app connects to the proxy server app. After the client connects, the server will "redirect" all HTTP requests to your local port.

__Installation__:

- install Node.js Platform
- install dependencies:

```sh
cd server
npm install
node client.js http://yourserverproxy.com 8000
# node client.js http://yourserverproxy.com 127.0.0.1:8000

# Help:
# node client.js SERVER_ENDPOINT LOCAL_PORT
# node client.js SERVER_ENDPOINT LOCAL_HOST:LOCAL_PORT
```