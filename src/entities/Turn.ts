import type { Player } from './Player';

export type TurnSummary = {
	card: string;
	count: number;
};

export type TurnPlayer = {
	player: Player;
	card: string;
};

export type Turn = {
	order: number;
	name: string;
	turnPlayers: TurnPlayer[];
	isFinished: boolean;
	canEndTurn: boolean;
	turnSummary: TurnSummary[];
};
