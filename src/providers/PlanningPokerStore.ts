import { writable } from 'svelte/store';
import { type Socket, io } from 'socket.io-client';
import { page } from '$app/stores';

import type { SocketResponse } from '~/entities/SocketResponse';
import type { Room } from '~/entities/Room';
import type { User } from '~/entities/User';
import { goto } from '$app/navigation';

export type PlanningPokerStoreProps = {
	socket: Socket | null;
	room: Room | null;
	user: User | null;
};

export const PlanningPokerStore = writable<PlanningPokerStoreProps>({
	socket: null,
	room: null,
	user: null
});

export function usePlanningPokerStore() {
	const { subscribe, update } = PlanningPokerStore;
	return {
		subscribe,
		connect() {
			const socket = io();
			const clearSocket = socket.on('connect', () => {
				let currentPage = '';
				const clearPage = page.subscribe((state) => (currentPage = state.route.id || ''));
				update((prevState) => ({
					...prevState,
					socket
				}));
				socket.on('createdUser', ({ data }: SocketResponse<User>) => {
					update((prevState) => ({
						...prevState,
						user: data as User
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
				socket.on('deletedRoom', () => {
					update(() => ({
						room: null,
						user: null,
						socket: null
					}));
					if (currentPage.startsWith('/room')) {
						goto('/create');
					}
				});
				socket.on('disconnect', () => {
					update(() => ({
						room: null,
						user: null,
						socket: null
					}));
					clearPage();
				});
			});
			return clearSocket.disconnect;
		}
	};
}

export function useSocket() {
	const { subscribe } = PlanningPokerStore;
	return {
		subscribe
	};
}
