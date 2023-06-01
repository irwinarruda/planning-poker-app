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
	 * @param {string} userId
	 * @param {string} userName
	 * @returns {User}
	 */
	createUser(userId, userName) {
		return { id: userId, name: userName };
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
			/** @type {SocketResponse} */
			let response = { status: 'error', data: 'Max rooms reached' };
			socket.emit('createRoom', response);
			return;
		}
		let roomId = uuid();
		let user = this.createUser(socket.id, data.userName);
		/** @type {Room} */
		let room = {
			id: roomId,
			owner: socket.id,
			name: data.roomName,
			cards: data.roomCards.split(',').map((card) => card.trim()),
			players: [user]
		};
		this.rooms.set(room.id, room);
		/** @type {SocketResponse} */
		let response = { status: 'success', data: user };
		socket.emit('createdUser', response);
		socket.join(room.id);
		this.io.to(room.id).emit('joinRoom', { status: 'success', data: room });
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
			let response = { status: 'error', data: 'Room does not exist' };
			return socket.emit('joinRoom', response);
		}

		let user = this.createUser(socket.id, data.userName);
		socket.emit('createdUser', user);

		room.players.push(user);
		socket.join(room.id);
		/** @type {SocketResponse} */
		let response = { status: 'success', data: room };
		this.io.to(room.id).emit('joinRoom', response);
	}

	/**
	 * @param {Socket} socket
	 */
	disconnect(socket) {
		this.rooms.forEach((room) => {
			let playerIndex = room.players.findIndex((player) => player.id === socket.id);
			if (playerIndex !== -1) {
				room.players.splice(playerIndex, 1);
				if (room.players.length === 0 || room.owner === socket.id) {
					this.rooms.delete(room.id);
					this.io.emit('delete-room', room.id);
					this.io.to(room.id).emit('deletedRoom');
				}
			}
		});
	}
}
