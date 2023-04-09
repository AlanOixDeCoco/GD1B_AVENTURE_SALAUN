export class Lever extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, connectedObstacles){
        super(scene, x, y, SPRITE_LEVER);

        this.setOrigin(0, 0);
        scene.physics.world.enable(this);

        this._gripType = "lever";

        this._pulled = false;

        this._connectedObstacles = connectedObstacles;

        this.setDepth(LAYER_GRIPS);
        this.setImmovable(true);
        
        this.scene.add.existing(this);

        this.scene.anims.create({
            key: 'pull_lever',
            frames: this.anims.generateFrameNumbers(SPRITE_LEVER, {start:0, end:3}),
            frameRate: 16,
            repeat: 0
        });
    }

    Pull(){
        if(this._pulled) return;
        
        this._pulled = true;
        this.anims.play("pull_lever");

        setTimeout(() => {
            this._connectedObstacles.forEach(obstacle => {
                obstacle.Deactivate();
            });
        }, 500);
    }
}

export class RightLever extends Lever {
    constructor(scene, x, y, connectedObstacles){
        super(scene, x, y, connectedObstacles);
        this.setFlipX(true);

        this.setBodySize(16, 16);
        this.setOffset(16, 0);
    }
}

export class LeftLever extends Lever {
    constructor(scene, x, y, connectedObstacles){
        super(scene, x, y, connectedObstacles);

        this.setBodySize(16, 16);
        this.setOffset(0, 0);
    }
}