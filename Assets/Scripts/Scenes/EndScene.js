export default class EndScene extends Phaser.Scene {
    constructor(){
        super(END_SCENE_KEY);
    }

    preload(){
        this.load.image("end_scene", "./Assets/Menus/end_scene.png");
    }

    create(){
        this.cameras.main.fadeIn(CAMERA_FADE_IN_DURATION);
        this._background = this.add.image(0, 0, "end_scene").setOrigin(0, 0);
    }
}