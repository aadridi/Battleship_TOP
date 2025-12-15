export function Gameboard() {
	const ROWS = 10;
	const COLUMNS = 10;
	const board = [];
	const listOfShips = [];

	for (let i = 0; i < ROWS; i++) {
		board[i] = [];
		for (let j = 0; j < COLUMNS; j++) {
			board[i][j] = {
				pointerToShip: null, // référence au "Ship" qui occupe la case
				attacked: false,
			};
		}
	}

	function placeShip(ship, coordinates, orientation) {
		const [x, y] = coordinates;
		const lengthShip = ship.length;

		if (x < 0 || x > 9 || y < 0 || y > 9) {
			throw new Error("Can't place ship outside the board.");
		}
		if ((x + (lengthShip - 1) > 9 && orientation === 'horizontal') || (y + (lengthShip - 1) > 9 && orientation === 'vertical')) {
			throw new Error("Part of the ship can't be placed outside the board.");
		}

		if (orientation !== 'horizontal' && orientation !== 'vertical') {
			throw new Error("Please select either of those two valid orientation : 'horizontal', 'vertical'.");
		}

		if (orientation === 'horizontal') {
			for (let i = 0; i < lengthShip; i++) {
				if (board[x + i][y].pointerToShip !== null) {
					throw new Error('A ship has already been placed in this cell.');
				} else {
					board[x + i][y].pointerToShip = ship;
				}
			}
			listOfShips.push(ship);
		}

		if (orientation === 'vertical') {
			for (let j = 0; j < lengthShip; j++) {
				if (board[x][y + j].pointerToShip !== null) {
					throw new Error('A ship has already been placed in this cell.');
				} else {
					board[x][y + j].pointerToShip = ship;
				}
			}
			listOfShips.push(ship);
		}
	}

	function receiveAttack() {}

	function allShipsSunk() {}

	function getBoard() {
		return board;
	}

	return { getBoard, placeShip };
}
