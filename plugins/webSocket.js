import { Server } from 'socket.io';

/**
 * @callback WebSocketCallback
 * @param {Server} io
 * @returns {void}
 */
/**
 * @param {WebSocketCallback} callback
 * @returns {import('vite').PluginOption}
 */
export function webSocket(callback) {
	return {
		name: 'webSocket',
		configureServer(server) {
			if (!server.httpServer) return;
			const io = new Server(server.httpServer);
			callback(io);
		}
	};
}
