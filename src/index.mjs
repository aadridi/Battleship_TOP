import { Ship } from './Ship.mjs';

const firstShip = Ship(4);

firstShip.hit();
firstShip.hit();

console.log(firstShip.getHitTaken()); // 2
console.log(firstShip.isSunk());      // false

firstShip.hit();
firstShip.hit();

console.log(firstShip.isSunk());      // true
console.log(firstShip.getHitTaken()); // 4
