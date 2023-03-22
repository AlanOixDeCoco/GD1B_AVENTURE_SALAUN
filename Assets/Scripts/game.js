//#region imports
import GameManager from "./Components/GameManager.js";
import Level001 from "./Scenes/Level001.js";
//#endregion

let gameManager = new GameManager();

// #region GAME CONFIGURATION
const config = {
    type: Phaser.AUTO,
    width: 256, height: 144,
    parent: 'game_viewport',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // deactivate vertical gravity
            debug: true
        }
    },
    render: {
        antialias: false
    },
    scene: [
        new Level001(gameManager),
    ],
    input: {
        gamepad: true,
    },
};
let game = new Phaser.Game(config); // creates the game object
// #endregion