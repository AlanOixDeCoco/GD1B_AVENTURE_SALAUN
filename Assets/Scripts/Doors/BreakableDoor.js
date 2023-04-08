export class BreakableDoor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_DOOR_COLLISION);

        this.setOrigin(0, 0);
        scene.physics.world.enable(this);

        this._health = BREAKABLE_DOOR_HEALTH;

        this.setDepth(LAYER_DEBUG);
        this.setImmovable(true);

        if(!DEBUG) this.setVisible(false);
        
        this.scene.add.existing(this);

        this._frontSprite = null;
    }

    OpenDoor(){
        this._frontSprite.setTexture(this._frontSprite.texture, 1);
        this.disableBody();
    }

    TakeDamage(amount){
        this.scene._camera.shake(CAMERA_SHAKE_HIT_DURATION, CAMERA_SHAKE_HIT_INTENSITY * amount);
        this._health -= amount;
        if(this._health <= 0){
            this.OpenDoor();
        }
    }
}

export class HorizontalBreakableDoor extends BreakableDoor {
    constructor(scene, x, y){
        super(scene, x, y + TILE_SIZE);

        this._frontSprite = scene.add.sprite(x, y, SPRITE_HORIZONTAL_BREAKABLE_DOOR, 0).setOrigin(0, 0).setDepth(LAYER_WALLS_FRONT);
        this.scene.add.existing(this._frontSprite);
    }
}