import { atom } from "recoil";

// Manages the position and rotation of the ship model.
export const shipPositionState = atom({
  key: "shipPosition", // unique ID (with respect to other atoms/selectors)
  default: {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: Math.PI, z: 0 },
  }, // default value (initial value)
});

// Manages the positions of the enemies in the game.
export const enemyPositionState = atom({
  key: "enemyPosition", // unique ID (with respect to other atoms/selectors)
  default: [
    { id: 1, x: -10, y: 10, z: -80 },
    { id: 2, x: 20, y: 20, z: -100 },
  ], // default value (initial value)
});

// The score for the game. Currently unused but can be used for future extensions.
export const scoreState = atom({
  key: "score", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (initial value)
});

// Game over state to manage the end of the game when the player collides with an enemy.
export const gameOverState = atom({
  key: "gameOver", // unique ID
  // if you have this extra comma, it will cause a syntax error
});
