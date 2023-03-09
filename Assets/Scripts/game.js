//#region imports
import TestScene from "./Scenes/TestScene.js";
//#endregion


// #region GAME CONFIGURATION
const config = {
    type: Phaser.AUTO,
    width: 256, height: 144,
    parent: 'game_viewport',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // deactivate vertical gravity
            debug: false
        }
    },
    render: {
        antialias: false
    },
    scene: [
        TestScene
    ],
    input: {
        gamepad: true,
    },
};
var game = new Phaser.Game(config); // creates the game object
// #endregion