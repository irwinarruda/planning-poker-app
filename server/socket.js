import { v4 as uuid } from 'uuid';

/**
 * @typedef {import('socket.io').Socket} Socket
 */

/**
 * @callback SocketMethod
 * @param {Socket} socket
 * @returns {void}
 */

export class Player {
	/**
	 * @param {string} id
	 * @param {string} name
	 */
	constructor(id, name) {
		/** @type {string} */
		this.id = id || uuid();
		/** @type {string} */
		this.name = name;
	}
}

export class TurnSummary {
	/**
	 * @param {string} card
	 */
	constructor(card) {
		/** @type {string} */
		this.card = card;
		/** @type {number} */
		this.count = 1;
	}

	increment() {
		this.count++;
	}
}

export class TurnPlayer {
	/**
	 * @param {Player} player
	 * @param {string | null} card
	 */
	constructor(player, card) {
		/** @type {Player} */
		this.player = player;
		/** @type {string | null} */
		this.card = card;
	}
}

export class Turn {
	/**
	 * @param {number} order
	 * @param {string | null} name
	 * @param {Player[]} players
	 */
	constructor(order, name, players) {
		/** @type {number} */
		this.order = order;
		/** @type {string | null} */
		this.name = name;
		/** @type {TurnPlayer[]} */
		this.turnPlayers = players.map((p) => new TurnPlayer(p, null));
		/** @type {boolean} */
		this.isFinished = false;
	}

	get canEndTurn() {
		return !this.isFinished && this.turnPlayers.some((p) => !!p.card);
	}

	/**
	 * @returns {TurnSummary[]}
	 */
	get turnSummary() {
		/** @type {TurnSummary[]} */
		let tSummary = [];
		return this.turnPlayers.reduce((final, p) => {
			if (!p.card) return final;
			let index = final.findIndex((f) => f.card === p.card);
			if (index !== -1) {
				final[index].increment();
				return final;
			}
			final.push(new TurnSummary(p.card));
			return final;
		}, tSummary);
	}

	/**
	 * @param {Player} player
	 * @returns {void}
	 **/
	addPlayer(player) {
		let p = this.turnPlayers.find((p) => p.player.id === player.id);
		if (!p) {
			this.turnPlayers.push(new TurnPlayer(player, null));
		}
	}

	/**
	 * @param {string} playerId
	 * @param {string} card
	 * @returns {void}
	 */
	updatePlayerCard(playerId, card) {
		let p = this.turnPlayers.find((p) => p.player.id === playerId);
		if (p) {
			p.card = card;
		}
	}

	/**
	 * @returns {void}
	 **/
	endTrun() {
		if (this.canEndTurn) {
			this.isFinished = true;
		}
	}

	toJSON() {
		return {
			order: this.order,
			name: this.name,
			turnPlayers: this.turnPlayers,
			isFinished: this.isFinished,
			canEndTurn: this.canEndTurn,
			turnSummary: this.turnSummary
		};
	}
}

export class Room {
	/**
	 * @param {string} name
	 * @param {string[]} cards
	 * @param {Player} owner
	 */
	constructor(name, cards, owner) {
		/** @type {string} */
		this.id = uuid();
		/** @type {string} */
		this.name = name;
		/** @type {string[]} */
		this.cards = cards;
		/** @type {Player} */
		this.owner = owner;
		/** @type {Player[]} */
		this.players = [owner];
		/** @type {Turn[]} */
		this.turns = [];
		this.turns.push(this.createTurn());
	}

	/**
	 * @param {Player} player
	 * @returns {void}
	 */
	addPlayer(player) {
		this.players.push(player);
		this.addPlayerToTurn(player);
	}

	createTurn() {
		let turn = new Turn(this.turns.length + 1, this.name, this.players);
		return turn;
	}

	getTurn() {
		return this.turns[this.turns.length - 1];
	}

	/**
	 * @param {Player} player
	 * @returns {void}
	 */
	addPlayerToTurn(player) {
		let turn = this.getTurn();
		turn.addPlayer(player);
	}

	/**
	 * @param {string} playerId
	 * @param {string} card
	 * @returns {void}
	 */
	updatePlayerCardInTurn(playerId, card) {
		let turn = this.getTurn();
		turn.updatePlayerCard(playerId, card);
	}

	startTurn() {
		this.turns.push(this.createTurn());
	}

	endTurn() {
		let turn = this.getTurn();
		turn.endTrun();
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			cards: this.cards,
			owner: this.owner,
			players: this.players,
			turns: this.turns.map((t) => t.toJSON())
		};
	}
}

export class SocketResponse {
	/**
	 * @param {'error' | 'success'} status
	 * @param {any} data
	 */
	constructor(status, data) {
		/** @type {'error' | 'success'} */
		this.status = status;
		/** @type {any} */
		if (data.toJSON) {
			this.data = data.toJSON();
		} else {
			this.data = JSON.parse(JSON.stringify(data));
		}
	}
}

export class SocketHandler {
	/**
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
			socket.on('updateTurn', (rest) => this.updateTurn(socket, rest));
			socket.on('endTurn', () => this.endTurn(socket));
			socket.on('startTurn', () => this.startTurn(socket));
			socket.on('disconnect', () => this.disconnect(socket));
		});
	}

	canCreateRoom() {
		return this.rooms.size < 6;
	}

	/**
	 * @param {string} playerId
	 * @returns {Room | undefined}
	 */
	findRoomByPlayerId(playerId) {
		/** @type {Room | undefined} */
		let room;
		this.rooms.forEach((r) => {
			if (r.players.find((player) => player.id === playerId)) {
				room = r;
			}
		});
		return room;
	}

	/**
	 * @typedef {Object} CreateRoomParams
	 * @property {string} playerName
	 * @property {string} roomName
	 * @property {string} roomCards
	 */
	/**
	 * @param {Socket} socket
	 * @param {CreateRoomParams} data
	 */
	createRoom(socket, data) {
		if (!this.canCreateRoom()) {
			socket.emit('createRoom', new SocketResponse('error', 'Max rooms reached'));
			return;
		}
		let player = new Player(socket.id, data.playerName);
		let room = new Room(
			data.roomName,
			data.roomCards.split(',').map((card) => card.trim()),
			player
		);
		this.rooms.set(room.id, room);

		socket.emit('createdPlayer', new SocketResponse('success', player));
		socket.join(room.id);

		this.io.to(room.id).emit('joinRoom', new SocketResponse('success', room));
	}

	/**
	 * @typedef {Object} JoinRoomParams
	 * @property {string} playerName
	 * @property  {string} roomId
	 */
	/**
	 * @param {Socket} socket
	 * @param {JoinRoomParams} data
	 */
	joinRoom(socket, data) {
		let room = this.rooms.get(data.roomId);
		if (!room) {
			return socket.emit('joinRoom', new SocketResponse('error', 'Room does not exist'));
		}

		let player = new Player(socket.id, data.playerName);
		socket.emit('createdPlayer', new SocketResponse('success', player));

		room.addPlayer(player);
		socket.join(room.id);
		this.io.to(room.id).emit('joinRoom', new SocketResponse('success', room));
	}

	/**
	 * @typedef {Object} UpdateTurnParams
	 * @property {string} card
	 */
	/**
	 * @param {Socket} socket
	 * @param {UpdateTurnParams} data
	 */
	updateTurn(socket, data) {
		let room = this.findRoomByPlayerId(socket.id);
		if (!room) {
			return socket.emit('updateRoom', new SocketResponse('error', 'Room does not exist'));
		}
		room.updatePlayerCardInTurn(socket.id, data.card);
		this.io.to(room.id).emit('updateRoom', new SocketResponse('success', room));
	}

	/**
	 * @param {Socket} socket
	 */
	startTurn(socket) {
		let room = this.findRoomByPlayerId(socket.id);
		if (!room) {
			return socket.emit('updateRoom', new SocketResponse('error', 'Room does not exist'));
		}
		room.startTurn();
		this.io.to(room.id).emit('updateRoom', new SocketResponse('success', room));
	}

	/**
	 * @param {Socket} socket
	 */
	endTurn(socket) {
		let room = this.findRoomByPlayerId(socket.id);
		if (!room) {
			return socket.emit('endTurn', new SocketResponse('error', 'Room does not exist'));
		}
		room.endTurn();
		this.io.to(room.id).emit('endTurn', new SocketResponse('success', room));
	}

	/**
	 * @param {Socket} socket
	 */
	disconnect(socket) {
		this.rooms.forEach((room) => {
			let playerIndex = room.players.findIndex((player) => player.id === socket.id);
			if (playerIndex !== -1) {
				room.players.splice(playerIndex, 1);
				if (room.players.length === 0 || room.owner.id === socket.id) {
					this.rooms.delete(room.id);
					this.io.emit('delete-room', room.id);
					this.io.to(room.id).emit('deletedRoom');
				}
			}
		});
	}
}
