import type { User } from './User';

export type Room = {
	id: string;
	name: string;
	cards: string[];
	owner: User;
	players: User[];
};
