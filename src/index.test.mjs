import { Ship } from './Ship.mjs';
import { Gameboard } from './Gameboard.mjs';

describe('Ship', () => {
	test('creates a ship with a given length', () => {
		const ship = Ship(3);

		expect(ship.length).toBe(3);
		expect(ship.isSunk()).toBe(false);
	});

	test('a ship is not sunk after one hit', () => {
		const ship = Ship(3);

		ship.hit();

		expect(ship.isSunk()).toBe(false);
	});

	test('a ship sinks after being hit length times', () => {
		const ship = Ship(3);

		ship.hit();
		ship.hit();
		ship.hit();

		expect(ship.isSunk()).toBe(true);
	});

	test('a ship does not sink before reaching its length', () => {
		const ship = Ship(4);

		ship.hit();
		ship.hit();
		ship.hit();

		expect(ship.isSunk()).toBe(false);
	});

	test('a ship remains sunk once sunk', () => {
		const ship = Ship(2);

		ship.hit();
		ship.hit();
		ship.hit(); // hit supplémentaire

		expect(ship.isSunk()).toBe(true);
	});
});

/* ------------------------- */

describe('Gameboard', () => {
	test('creates a gameboard', () => {
		const board = Gameboard();
		expect(board).toBeDefined();
	});

	test('starts with no ships sunk', () => {
		const board = Gameboard();
		expect(board.allShipsSunk()).toBe(false);
	});
});

/* ------------------------- */

describe('Ship placement', () => {
	let board;
	let ship;

	beforeEach(() => {
		board = Gameboard();
		ship = Ship(3);
	});

	test('places a ship at given coordinates', () => {
		board.placeShip(ship, [0, 0], 'horizontal');
		expect(board.ships.length).toBe(1);
	});

	test('does not allow overlapping ships', () => {
		board.placeShip(ship, [0, 0], 'horizontal');
		expect(() => board.placeShip(Ship(2), [0, 0], 'vertical')).toThrow();
	});

	test('does not allow ships outside the board', () => {
		expect(() => board.placeShip(ship, [9, 9], 'horizontal')).toThrow();
	});
});

/* ------------------------- */

describe('Receiving attacks', () => {
	let board;
	let ship;

	beforeEach(() => {
		board = Gameboard();
		ship = Ship(2);
		board.placeShip(ship, [0, 0], 'horizontal');
	});

	test('records a missed attack', () => {
		board.receiveAttack([5, 5]);
		expect(board.missedAttacks.length).toBe(1);
	});

	test('records a hit on a ship', () => {
		board.receiveAttack([5, 5]);
		expect(ship.isSunk()).toBe(false);
	});

	test('cannot attack the same position twice', () => {
		board.receiveAttack([0, 0]);
		expect(() => board.receiveAttack([0, 0])).toThrow();
	});
});

/* ------------------------- */

describe('Ship interaction', () => {
	test('calls hit on the correct ship', () => {
		const board = Gameboard();
		const ship = Ship(1);

		jest.spyOn(ship, hit);

		board.placeShip(ship, [0, 0], 'horizontal');
		board.receiveAttack([0, 0]);

		expect(ship.hit).toHaveBeenCalledTimes(1);
	});
});

/* ------------------------- */

describe('Game over condition', () => {
	test('returns true when all the ships are sunk', () => {
		const board = Gameboard();
		const ship1 = Ship(1);
		const ship2 = Ship(1);

		board.placeShip(ship1, [0, 0], 'horizontal');
		board.placeShip(ship2, [1, 0], 'horizontal');

		board.receiveAttack([0, 0]);
		board.receiveAttack([1, 0]);

		expect(board.allShipSunk()).toBe(true);
	});
});
