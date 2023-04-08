export default class TutoGamepadScene extends Phaser.Scene {
    constructor(){
        super("tuto_gamepad_scene");
    }

    preload(){
        this.load.image("tutomenu_gamepad_background", "./Assets/Menus/tutomenu_gamepad_background.png");
        this.load.spritesheet("tutomenu_nextbutton", "./Assets/Menus/tutomenu_nextbtn_spritesheet.png", {frameWidth: 24, frameHeight: 16});
    }

    create(){
        this._background = this.add.image(0, 0, "tutomenu_gamepad_background").setOrigin(0, 0);
        this._nextButton = this.add.sprite(149, 10, "tutomenu_nextbutton").setOrigin(0, 0);

        // button animations
        this.anims.create({
            key: 'next_button_up',
            frames: this.anims.generateFrameNumbers("tutomenu_nextbutton", {start:0, end:0}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'next_button_down',
            frames: this.anims.generateFrameNumbers("tutomenu_nextbutton", {start:1, end:1}),
            frameRate: 1,
            repeat: -1
        });

        this._nextButton.setInteractive()
        .on("pointerover", () => {
            this._nextButton.anims.play("next_button_down");
        })
        .on("pointerout", () => {
            this._nextButton.anims.play("next_button_up");
        })
        .on("pointerdown", () => {
            setTimeout(() => {
                this.scene.start(LEVEL_KEY_001);
            }, CAMERA_FADE_OUT_DURATION);
            this.cameras.main.fadeOut(CAMERA_FADE_OUT_DURATION);
        });

        this.cameras.main.fadeIn(CAMERA_UI_FADE_IN_DURATION);
    }

    update(){
    }
}