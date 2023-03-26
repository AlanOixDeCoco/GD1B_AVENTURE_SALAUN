import GameScene from "../Components/GameScene.js";
import Player from "../Player/Player.js";

export default class Level002 extends GameScene{
    constructor(gameManager){
        super(gameManager, LEVEL_KEY_002, LEVEL_NAME_002);

        this._currentRoom = {x: 0, y: 0};
    }

    preload(){
        
    }

    create(){
        this.cameras.add(0, 0, GAME_WIDTH, GAME_HEIGHT, true);
        this.cameras.main.setBackgroundColor(0x8888FF);
    }

    update(time, deltaTime){
    }
}