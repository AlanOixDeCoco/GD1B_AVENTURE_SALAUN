export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey, shadowIndex = 0){
        super(scene, x, y, spriteKey, 0);
        scene.physics.world.enable(this);

        this._shadow = scene.add.image(
            this.getBottomCenter().x, 
            this.getBottomCenter().y + OFFSET_SHADOW_Y, 
            SPRITE_SHADOWS,
            shadowIndex
        );

        this._weaponAnchor = {x: 0, y: 0};
    }

    onStart(){
        this.scene.add.existing(this);
        this.setDepth(LAYER_ENTITIES);
    }

    update(){
        
    }

    lateUpdate(){
        this._shadow.x = this.getBottomCenter().x;
        this._shadow.y = this.getBottomCenter().y + OFFSET_SHADOW_Y;
    }

    Attack(){
        if(this._weapon){
            this._weapon.Fire();
        }
    }

    getWeaponOrigin(){
        var origin = {x: 0, y: this.y + this._weaponAnchor.y, flipX: this.flipX, orientation: this.body.velocity.angle()};

        origin.x = this.flipX ? this.x - this._weaponAnchor.x : this.x + this._weaponAnchor.x;

        return origin;
    }
}