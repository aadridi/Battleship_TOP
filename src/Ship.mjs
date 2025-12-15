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
