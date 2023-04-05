//#region imports
import GameManager from "./Components/GameManager.js";
import BossLevel from "./Scenes/BossLevel.js";
import GameOverScene from "./Scenes/GameOverScene.js";
import Level001 from "./Scenes/Level001.js";
import Level002 from "./Scenes/Level002.js";
//#endregion

let gameManager = new GameManager();

// #region GAME CONFIGURATION
const config = {
    type: Phaser.CANVAS,
    width: 256, height: 144,
    parent: 'game_viewport',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // deactivate vertical gravity
            debug: DEBUG
        }
    },
    render: {
        antialias: false
    },
    scene: [
        new Level001(gameManager),
        new Level002(gameManager),

        new BossLevel(gameManager),

        new GameOverScene(gameManager)
    ],
    input: {
        gamepad: true,
    },
};
let game = new Phaser.Game(config); // creates the game object
// #endregion