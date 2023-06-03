import { type Socket, io } from 'socket.io-client';
import { writable } from 'svelte/store';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

import type { SocketResponse } from '~/entities/SocketResponse';
import type { Room } from '~/entities/Room';
import type { Player } from '~/entities/Player';

export type PlanningPokerStoreProps = {
	socket: Socket | null;
	room: Room | null;
	player: Player | null;
	selectedCard: string | null;
};

export const PlanningPokerStore = writable<PlanningPokerStoreProps>({
	socket: null,
	room: null,
	player: null,
	selectedCard: null
});

export function usePlanningPokerStore() {
	const { subscribe, update } = PlanningPokerStore;
	return {
		subscribe,
		select(card: string | null) {
			update((prevState) => ({
				...prevState,
				selectedCard: card
			}));
		},
		connect() {
			const socket = io();
			const clearSocket = socket.on('connect', () => {
				let currentPage = '';
				const clearPage = page.subscribe((state) => (currentPage = state.route.id || ''));
				update((prevState) => ({
					...prevState,
					socket
				}));
				socket.on('createdPlayer', ({ data }: SocketResponse<Player>) => {
					update((prevState) => ({
						...prevState,
						player: data as Player
					}));
				});
				socket.on('joinRoom', ({ status, data }: SocketResponse<Room>) => {
					if (status === 'error') {
						alert(data);
						return;
					}
					update((prevState) => ({
						...prevState,
						room: data as Room
					}));
					goto(`/room/${(data as Room).id}`);
				});
				socket.on('updateRoom', ({ status, data }: SocketResponse<Room>) => {
					console.log('updateRoom', data);
					if (status === 'error') {
						alert(data);
						return;
					}
					update((prevState) => ({
						...prevState,
						room: data as Room
					}));
				});
				socket.on('deletedRoom', () => {
					update(() => ({
						room: null,
						player: null,
						socket: null,
						selectedCard: null
					}));
					if (currentPage.startsWith('/room')) {
						goto('/create');
					}
				});
				socket.on('endTurn', ({ status, data }: SocketResponse<Room>) => {
					if (status === 'error') {
						alert(data);
						return;
					}
					update((prevState) => ({
						...prevState,
						room: data as Room,
						selectedCard: null
					}));
				});
				socket.on('disconnect', () => {
					update(() => ({
						room: null,
						player: null,
						socket: null,
						selectedCard: null
					}));
					clearPage();
				});
			});
			return clearSocket.disconnect;
		}
	};
}
