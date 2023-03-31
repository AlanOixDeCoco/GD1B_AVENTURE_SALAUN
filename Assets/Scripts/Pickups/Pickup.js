export default class Pickup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey = "", pickupType, properties){
        super(scene, x, y, spriteKey);

        this._properties = properties;

        this._pickupType = pickupType;

        this._shadow = scene.add.image(
            this.getBottomCenter().x, 
            this.getBottomCenter().y + OFFSET_SHADOW_PICKUP_Y, 
            SPRITE_SHADOWS,
            0
        );

        this.scene.add.existing(this);
        this.setDepth(LAYER_WEAPONS_BOTTOM);

        scene.physics.world.enable(this);
    }

    update(){
        this.y += Math.sin((this.scene.time.now * Math.PI) / 1000) * 0.05;
    }

    destroy(){
        this._shadow.destroy();
        super.destroy();
    }
}