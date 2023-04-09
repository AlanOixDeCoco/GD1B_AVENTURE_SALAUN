export class Spikes extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, connectionID){
        super(scene, x, y, SPRITE_SPIKES);

        this.setOrigin(0, 0);
        scene.physics.world.enable(this);

        this._connectionID = connectionID;

        this.setDepth(LAYER_OBSTACLES);
        this.setImmovable(true);
        
        this.scene.add.existing(this);
    }

    Deactivate(){
        this.setTexture(this.texture, 1);
        this.disableBody();
    }
}