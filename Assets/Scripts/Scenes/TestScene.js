import GameRoom from "../GameRoom.js";
import GameScene from "../GameScene.js";
import Player from "../Player.js";

export default class TestScene extends GameScene{
    constructor(){
        super("testScene", "Scène test", new Player(), 100, 50);

        this.gameRooms = [
            new GameRoom({entrancesPositions:{
                top: [0, 0],
                bottom: [0, 0],
                left: [0, 0],
                right: [0, 0]
            }})
        ];
    }

    preload(){
        if(DEBUG) console.log(`Chargement de la scène "${this.name}"`);
    }
}