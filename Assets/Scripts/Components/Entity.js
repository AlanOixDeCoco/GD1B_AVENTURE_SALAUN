export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey, shadowIndex = 0){
        super(scene, x, y, spriteKey, 0).setOrigin(0, 0);
        scene.physics.world.enable(this);

        this._shadow = scene.add.image(
            this.getBottomCenter().x, 
            this.getBottomCenter().y, 
            "shadows",
            shadowIndex
        );
    }

    onStart(){
        this.scene.add.existing(this);
        this.setDepth(LAYER_ENTITIES);
    }

    update(){
        this._shadow.x = this.getBottomCenter().x;
        this._shadow.y = this.getBottomCenter().y;
    }
}