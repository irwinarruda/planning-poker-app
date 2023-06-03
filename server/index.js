import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { SocketHandler } from './socket.js';
import { handler } from '../build/handler.js';

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);
new SocketHandler(io);

app.use(handler);

server.listen(port, () => {
	console.log('Connected to the server');
	console.log('http://localhost:3000');
});
