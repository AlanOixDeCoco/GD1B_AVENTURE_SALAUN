export default class GameScene extends Phaser.Scene{
    constructor(key, name, player, spawnX, spawnY){
        super(key); // set the scene key to interact with the sceneManager
        this.name = name;
        this.player = player;
    }

    update(time){
        this.player.update(time);
    }

    getPlayer() { return this.player; }
}