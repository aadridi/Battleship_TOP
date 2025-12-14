export function Ship(length) {
	let hitTaken = 0;

	function hit() {
		hitTaken += 1;
	}

	function isSunk() {
		return hitTaken >= length;
	}

	function getHitTaken() {
		return hitTaken;
	}

	return {
		length,
		hit,
		isSunk,
		getHitTaken,
	};
}

const firstShip = Ship(4);

firstShip.hit();
firstShip.hit();

console.log(firstShip.getHitTaken()); // 2
console.log(firstShip.isSunk());      // false

firstShip.hit();
firstShip.hit();

console.log(firstShip.isSunk());      // true
console.log(firstShip.getHitTaken()); // 4
