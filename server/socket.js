import { v4 as uuid } from 'uuid';

/**
 * @typedef {import('socket.io').Socket} Socket
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Room
 * @property {string} id
 * @property {string} name
 * @property {string[]} cards
 * @property {string} owner
 * @property {User[]} players
 */

/**
 * @typedef {Object} SocketResponse
 * @property {'error'|'success'} status
 * @property {any} data
 */

/**
 * @callback SocketMethod
 * @param {Socket} socket
 * @returns {void}
 */

export class SocketHandler {
	/**
	 * @constructor
	 * @param {import('socket.io').Server} io
	 */
	constructor(io) {
		/** @type {import('socket.io').Server} */
		this.io = io;
		/** @type {Map<string, Room>} */
		this.rooms = new Map();
		this.start();
	}

	start() {
		this.io.on('connect', (socket) => {
			socket.on('createRoom', (rest) => this.createRoom(socket, rest));
			socket.on('joinRoom', (rest) => this.joinRoom(socket, rest));
			socket.on('disconnect', () => this.disconnect(socket));
		});
	}

	canCreateRoom() {
		return this.rooms.size < 6;
	}

	/**
	 * @param {*} userName
	 * @returns {User}
	 */
	createUser(userName) {
		return { id: uuid(), name: userName };
	}

	/**
	 * @typedef {Object} CreateRoomParams
	 * @property {string} userName
	 * @property {string} roomName
	 * @property {string} roomCards
	 */
	/**
	 * @param {Socket} socket
	 * @param {CreateRoomParams} data
	 */
	createRoom(socket, data) {
		if (!this.canCreateRoom()) {
			socket.emit('createRoom');
			return;
		}
		let roomId = uuid();
		let user = this.createUser(data.userName);
		/** @type {Room} */
		let room = {
			id: roomId,
			owner: socket.id,
			name: data.roomName,
			cards: data.roomCards.split(','),
			players: [user]
		};
		this.rooms.set(roomId, room);
		socket.emit('createdUser', { status: 'success', data: user });
		socket.join(room.id);
		socket.to(room.id).emit('joinRoom', { status: 'success', data: room });
	}

	/**
	 * @typedef {Object} JoinRoomParams
	 * @property {string} userName
	 * @property  {string} roomId
	 */
	/**
	 * @param {Socket} socket
	 * @param {JoinRoomParams} data
	 */
	joinRoom(socket, data) {
		let room = this.rooms.get(data.roomId);
		if (!room) {
			/** @type {SocketResponse} */
			const response = { status: 'error', data: 'Room does not exist' };
			return socket.emit('joinRoom', response);
		}

		let user = this.createUser(data.userName);
		socket.emit('createdUser', user);

		room.players.push(user);
		/** @type {SocketResponse} */
		const response = { status: 'success', data: room };
		socket.join(room.id);
		socket.to(room.id).emit('joinRoom', response);
	}

	/**
	 * @param {Socket} socket
	 */
	disconnect(socket) {
		this.rooms.forEach((room) => {
			const playerIndex = room.players.findIndex((player) => player.id === socket.id);
			if (playerIndex !== -1) {
				room.players.splice(playerIndex, 1);
				if (room.players.length === 0) {
					this.rooms.delete(room.id);
				}
			}
		});
	}
}
