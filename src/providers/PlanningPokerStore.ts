import { writable } from 'svelte/store';
import type { Socket } from 'socket.io-client';
import type { Room } from '~/entities/Room';
import type { User } from '~/entities/User';

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
