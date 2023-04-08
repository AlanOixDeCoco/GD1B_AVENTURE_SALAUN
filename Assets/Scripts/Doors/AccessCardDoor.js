export class AccessCardDoor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_DOOR_COLLISION);

        this.setOrigin(0, 0);
        scene.physics.world.enable(this);

        this.setDepth(LAYER_DEBUG);
        this.setImmovable(true);

        if(!DEBUG) this.setVisible(false);
        
        this.scene.add.existing(this);

        this._backSprite = null;
    }

    OpenDoor(){
        this._backSprite.setTexture(this._backSprite.texture, 1);
        this.disableBody();
    }
}

export class HorizontalAccessCardDoor extends AccessCardDoor {
    constructor(scene, x, y){
        super(scene, x, y + TILE_SIZE);

        this._backSprite = scene.add.sprite(x, y, SPRITE_HORIZONTAL_BREAKABLE_DOOR, 0).setOrigin(0, 0).setDepth(LAYER_WALLS_FRONT);
        this.scene.add.existing(this._backSprite);
    }
}

export class VerticalAccessCardDoor extends AccessCardDoor {
    constructor(scene, x, y){
        super(scene, x, y + TILE_SIZE);

        this._backSprite = scene.add.sprite(x, y, SPRITE_VERTICAL_BREAKABLE_DOOR_BACK, 0).setOrigin(0, 0).setDepth(LAYER_WALLS_BACK);
        this.scene.add.existing(this._backSprite);
    }

    OpenDoor(){
        super.OpenDoor();

        this._frontSprite = this.scene.add.sprite(this.x, this.y - TILE_SIZE, SPRITE_VERTICAL_BREAKABLE_DOOR_FRONT, 0).setOrigin(0, 0).setDepth(LAYER_WALLS_FRONT);
        this.scene.add.existing(this._frontSprite);
    }
}