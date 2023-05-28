/**
 * @param {import('socket.io').Server} io
 * @returns {void}
 */
export function handleSocket(io) {
	io.on('connect', (socket) => {
		socket.emit('first', 'Hello World');
	});
}
