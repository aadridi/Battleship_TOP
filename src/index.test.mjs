import { Ship } from './Ship.mjs';

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
