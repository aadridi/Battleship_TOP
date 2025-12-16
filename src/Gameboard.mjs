export function Gameboard() {
	const ROWS = 10;
	const COLUMNS = 10;
	let board = [];
	let listOfShips = [];
	let missedAttacks = [];

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

		if (listOfShips.includes(ship)) {
			throw new Error('This ship has already been placed on the board.');
		}

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

	function receiveAttack(coordinates) {
		const [x, y] = coordinates;

		if (x < 0 || x > 9 || y < 0 || y > 9) {
			throw new Error("Can't place an attack outside the board.");
		}

		const targetAttack = board[x][y];

		if (targetAttack.attacked === true) {
			throw new Error('This cell was already attacked!');
		}

		if (targetAttack.pointerToShip === null) {
			missedAttacks.push([x, y]);
			targetAttack.attacked = true;
			console.log("Your attack missed! There's nothing there.");
		} else {
			const shipHit = targetAttack.pointerToShip;
			targetAttack.attacked = true;
			shipHit.hit();
			console.log('Your attack hit! Well played!');
		}
	}

	function allShipsSunk() {
		return listOfShips.every((ship) => ship.isSunk());
	}

	function getBoard() {
		return board;
	}

	return { getBoard, placeShip, receiveAttack, allShipsSunk };
}
