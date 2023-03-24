export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey, shadowIndex = 0){
        super(scene, x, y, spriteKey, 0).setOrigin(0, 0);
        scene.physics.world.enable(this);

        this._shadow = scene.add.image(
            this.getBottomCenter().x, 
            this.getBottomCenter().y + OFFSET_SHADOW_Y, 
            "shadows",
            shadowIndex
        );

        this._weapon = null;
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

        if(this._weapon){

        }
    }

    Attack(){
        if(this._weapon){
            this._weapon.Fire();
        }
    }
}