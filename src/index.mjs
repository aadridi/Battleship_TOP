import { Ship } from './Ship.mjs';
import { Gameboard } from './Gameboard.mjs';

const firstShip = Ship(4);

/* firstShip.hit();
firstShip.hit();

console.log(firstShip.getHitTaken()); // 2
console.log(firstShip.isSunk());      // false

firstShip.hit();
firstShip.hit();

console.log(firstShip.isSunk());      // true
console.log(firstShip.getHitTaken()); // 4 */

const newBoard = Gameboard();
newBoard.placeShip(firstShip, [0,0], 'vertical');
console.log(newBoard.getBoard());
