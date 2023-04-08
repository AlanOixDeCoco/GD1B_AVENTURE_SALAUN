export default class Pickup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey = "", pickupType, properties = null){
        super(scene, x, y, spriteKey);

        scene.physics.world.enable(this);

        this._properties = properties;

        this._pickupType = pickupType;

        this._shadow = scene.add.image(
            this.getBottomCenter().x, 
            this.getBottomCenter().y + OFFSET_SHADOW_PICKUP_Y, 
            SPRITE_SHADOWS,
            0
        ).setDepth(LAYER_SHADOWS);

        this.setDepth(LAYER_WEAPONS_BOTTOM);
        
        this.scene.add.existing(this);
    }

    update(){
        this.y += Math.sin((this.scene.time.now * Math.PI) / 1000) * 0.05;
    }

    destroy(){
        this._shadow.destroy();
        super.destroy();
    }
}