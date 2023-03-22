import GameScene from "../Components/GameScene.js";
import Player from "../Player/Player.js";

export default class Level001 extends GameScene{
    constructor(gameManager){
        super(gameManager, "level001", "Level 1");
    }

    preload(){
        this.load.image('testMap', 'Assets/Sprites/testMap.png');
        this.load.spritesheet("player", "./Assets/Sprites/playerSpritesheet.png", {frameWidth: 16, frameHeight: 24});
    }

    create(){
        // Create scene camera
        this._camera = this.cameras.add(0, 0, GAME_WIDTH, GAME_HEIGHT, true);
        this._camera.setBackgroundColor(0x8888FF);

        // Create a test map
        this._testMap = this.add.image(0, 0, "testMap").setOrigin(0, 0);
        
        // Create a player
        this._player = new Player(this, 32, 32);
    }

    update(time, deltaTime){
        super.update();
        this._player.update();
    }
}