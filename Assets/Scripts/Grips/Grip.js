export class Grip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y + TILE_SIZE, SPRITE_GRIP);

        this._gripType = "grip";

        this.setOrigin(0, 1);
        scene.physics.world.enable(this);

        this.setDepth(LAYER_OBSTACLES);
        this.setImmovable(true);
        
        this.scene.add.existing(this);

        this.setBodySize(16, 20);
        this.setOffset(0, 8);
    }
}