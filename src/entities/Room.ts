import type { Turn } from './Turn';
import type { Player } from './Player';

export type Room = {
	id: string;
	name: string;
	cards: string[];
	owner: Player;
	players: Player[];
	turns: Turn[];
};
