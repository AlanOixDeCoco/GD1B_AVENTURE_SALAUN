export class AccessCardDoor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_DOOR_COLLISION);

        this._opened = false;

        this.setOrigin(0, 0);
        scene.physics.world.enable(this);

        this.setDepth(LAYER_DEBUG);
        this.setImmovable(true);

        if(!DEBUG) this.setVisible(false);
        
        this.scene.add.existing(this);

        this._backSprite = null;
    }

    OpenDoor(){
        this.disableBody();
    }
}

export class HorizontalAccessCardDoor extends AccessCardDoor {
    constructor(scene, x, y){
        super(scene, x, y + TILE_SIZE);

        this._backSprite = scene.add.sprite(x, y + (TILE_SIZE / 2), SPRITE_HORIZONTAL_ACCESS_CARD_DOOR, 0).setOrigin(0, 0).setDepth(LAYER_WALLS_FRONT);
        this.scene.add.existing(this._backSprite);

        this.scene.anims.create({
            key: 'open_horizontal_access_door',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_HORIZONTAL_ACCESS_CARD_DOOR, {start:0, end:3}),
            frameRate: 8,
            repeat: 0
        });
    }

    OpenDoor(){
        this._opened = true;

        this._backSprite.anims.play('open_horizontal_access_door', true);

        setTimeout(() => {
            super.OpenDoor();
        }, 500);
    }
}

export class VerticalAccessCardDoor extends AccessCardDoor {
    constructor(scene, x, y){
        super(scene, x, y + TILE_SIZE);

        this._backSprite = scene.add.sprite(x + 14, y, SPRITE_VERTICAL_ACCESS_CARD_DOOR, 0).setOrigin(0, 0).setDepth(LAYER_WALLS_BACK);
        this.scene.add.existing(this._backSprite);

        this._frontSprite = scene.add.sprite(x + 14, y, SPRITE_VERTICAL_ACCESS_CARD_DOOR, 1).setOrigin(0, 0).setDepth(LAYER_DOORS);
        this.scene.add.existing(this._frontSprite);

        this.scene.anims.create({
            key: 'open_vertical_access_door',
            frames: this.anims.generateFrameNumbers(SPRITE_VERTICAL_ACCESS_CARD_DOOR, {start:1, end:4}),
            frameRate: 8,
            repeat: 0
        });
    }

    OpenDoor(){
        this._opened = true;

        this._frontSprite.anims.play('open_vertical_access_door', true);

        setTimeout(() => {
            super.OpenDoor();
        }, 500);
    }
}

export class HorizontalBossDoor extends AccessCardDoor {
    constructor(scene, x, y){
        super(scene, x, y + TILE_SIZE);

        this._backSprite = scene.add.sprite(x, y + (TILE_SIZE / 2), SPRITE_HORIZONTAL_BOSS_DOOR, 0).setOrigin(0, 0).setDepth(LAYER_WALLS_FRONT);
        this.scene.add.existing(this._backSprite);

        this.scene.anims.create({
            key: 'open_horizontal_boss_door',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_HORIZONTAL_BOSS_DOOR, {start:0, end:3}),
            frameRate: 8,
            repeat: 0
        });
    }

    OpenDoor(){
        this._opened = true;
        
        this._backSprite.anims.play('open_horizontal_boss_door', true);

        setTimeout(() => {
            super.OpenDoor();
        }, 500);
    }
}