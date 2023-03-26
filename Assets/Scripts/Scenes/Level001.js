import GameScene from "../Components/GameScene.js";
import Player from "../Player/Player.js";
import Revolver from "../Weapons/Revolver.js";

export default class Level001 extends GameScene{
    constructor(gameManager){
        super(gameManager, LEVEL_KEY_001, LEVEL_NAME_001);
    }

    preload(){
        this.load.image('testMap', 'Assets/Sprites/testMap.png');

        this.load.spritesheet(SPRITE_PLAYER, "./Assets/Sprites/playerSpritesheet.png", {frameWidth: 18, frameHeight: 26});
        this.load.spritesheet(SPRITE_SHADOWS, "./Assets/Sprites/shadows.png", {frameWidth: 32, frameHeight: 8});

        this.load.image(SPRITE_WEAPON_REVOLVER, "./Assets/Sprites/weapon_revolver.png");
    }

    create(){
        // Create scene camera
        this._camera = this.cameras.add(0, 0, GAME_WIDTH, GAME_HEIGHT, true);
        this._camera.setBackgroundColor(0x333333);

        // Create a test map
        this._testMap = this.add.image(0, 0, "testMap").setOrigin(0, 0);
        
        // Create a player
        var player = new Player(this, 118, 56, SPRITE_PLAYER);
        this._entities.push(player);

    }

    update(time, deltaTime){
        super.update();
    }
}