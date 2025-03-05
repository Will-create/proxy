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

The server app must be hosted on your server and must be available via HTTP protocol because the client will connect to it via WebSocket. This app is a standard Total.js web app.

__Installation__:

- install [Node.js Platform](https://nodejs.org/en/download)
- install dependencies (only Total.js v5):

```sh
cd server
npm install
npm start
# or run it via: node index.js
```

## Client

The client app connects to the proxy server app. After the client connects, the server will "redirect" all HTTP requests to your local port.

### Installation

1. Install [Node.js Platform](https://nodejs.org/en/download)
2. Install Total.js v5 globally:

   ```sh
   npm install -g total5
   ```

### Usage

To start the proxy client, use the following command:

```sh
total5 proxyclient SERVER_ENDPOINT LOCAL_PORT
```

For example:

```sh
total5 proxyclient https://localhost.zapwize.com 8000
```

This will connect to the proxy server and forward all HTTP requests to your local port 8000.

### Alternative Method (Legacy)

If you prefer to install dependencies locally and run the script manually:

```sh
# Clone this repository and follow the steps below
cd client
npm install
node client.js SERVER_ENDPOINT LOCAL_PORT
# or
node client.js SERVER_ENDPOINT LOCAL_HOST:LOCAL_PORT
```

Example:

```sh
node client.js http://yourserverproxy.com 8000
# or
node client.js http://yourserverproxy.com 127.0.0.1:8000
```
