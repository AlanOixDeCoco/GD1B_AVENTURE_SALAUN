export default class GameOverScene extends Phaser.Scene {
    constructor(){
        super(GAMEOVERSCENE_KEY);
    }

    preload(){
        this.load.image("gameover_background", "./Assets/Menus/gameover_scene.png");
    }

    create(){
        this.cameras.main.fadeIn(CAMERA_FADE_IN_DURATION);
        this._background = this.add.image(0, 0, "gameover_background").setOrigin(0, 0);
    }
}