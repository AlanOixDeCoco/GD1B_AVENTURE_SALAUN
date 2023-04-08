export default class StartScene extends Phaser.Scene {
    constructor(){
        super("startscene");
    }

    preload(){
        this.load.image("startmenu_background", "./Assets/Menus/startmenu_background.png");
        this.load.spritesheet("startmenu_playbutton", "./Assets/Menus/startmenu_playbtn_spritesheet.png", {frameWidth: 110, frameHeight: 27});
    }

    create(){
        this._background = this.add.image(0, 0, "startmenu_background").setOrigin(0, 0);
        this._playButton = this.add.sprite(73, 60, "startmenu_playbutton").setOrigin(0, 0);

        // button animations
        this.anims.create({
            key: 'play_button_up',
            frames: this.anims.generateFrameNumbers("startmenu_playbutton", {start:0, end:0}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'play_button_down',
            frames: this.anims.generateFrameNumbers("startmenu_playbutton", {start:1, end:1}),
            frameRate: 1,
            repeat: -1
        });

        this._playButton.setInteractive()
        .on("pointerover", () => {
            this._playButton.anims.play("play_button_down");
        })
        .on("pointerout", () => {
            this._playButton.anims.play("play_button_up");
        })
        .on("pointerdown", () => {
            setTimeout(() => {
                this.scene.start("tuto_keyboard_scene");
            }, CAMERA_FADE_OUT_DURATION);
            this.cameras.main.fadeOut(CAMERA_UI_FADE_OUT_DURATION);
        });
    }

    update(){
    }
}