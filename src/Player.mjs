import { Gameboard } from './Gameboard.mjs';

export function Player(name, type) {
	const playerName = name;
	const playerType = type;
	const playerGameboard = Gameboard();

	return { playerName, playerType, playerGameboard };
}
