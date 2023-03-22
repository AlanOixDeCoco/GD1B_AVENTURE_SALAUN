import GameScene from "../Components/GameScene.js";

export default class Level003 extends GameScene{
    constructor(gameManager){
        super(gameManager, "level003", "Level 3");

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