//#region imports
import GameManager from "./Components/GameManager.js";
import EndScene from "./Scenes/EndScene.js";
import GameOverScene from "./Scenes/GameOverScene.js";
import Level001 from "./Scenes/Level001.js";
import StartScene from "./Scenes/StartScene.js";
import TutoGamepadScene from "./Scenes/TutoGamepadScene.js";
import TutoKeyboardScene from "./Scenes/TutoKeyboardScene.js";
//#endregion

let gameManager = new GameManager();

// #region GAME CONFIGURATION
const config = {
    type: Phaser.WEBGL,
    width: 256, height: 144,
    parent: 'game_viewport',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // deactivate vertical gravity
            debug: DEBUG
        }
    },
    pixelArt: true,
    scene: [
        StartScene,

        TutoKeyboardScene,
        TutoGamepadScene,
        
        new Level001(gameManager),

        GameOverScene,
        EndScene
    ],
    input: {
        gamepad: true,
    },
};
let game = new Phaser.Game(config); // creates the game object
// #endregion