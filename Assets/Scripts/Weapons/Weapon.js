export default class Weapon extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, parent, pivot, sprite){
        super(scene, parent.getWeaponOrigin.x, parent.getWeaponOrigin.y, sprite);

        this.setDisplayOrigin(pivot.x, pivot.y);

        this._parent = parent;

        this.scene.add.existing(this);
        this.setDepth(LAYER_WEAPONS);
    }
    
    Fire(){
        console.log("Fire weapon!");
    }

    update(){
        var origin = this._parent.getWeaponOrigin();

        this.setFlipX(origin.flipX);
        this.x = origin.x;
        this.y = origin.y;
        this.angle = (origin.orientation);
    }
}