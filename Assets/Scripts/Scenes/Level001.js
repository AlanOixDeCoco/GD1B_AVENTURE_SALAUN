import GameScene from "../Components/GameScene.js";
import Enemy from "../Enemies/Enemy.js";
import { RevolverPickup, RiflePickup } from "../Pickups/Pickups.js";
import Player from "../Player/Player.js";

export default class Level001 extends GameScene{
    constructor(gameManager){
        super(gameManager, LEVEL_KEY_001, LEVEL_NAME_001);
    }

    preload(){
        super.preload();
        
        this.load.tilemapTiledJSON(LEVEL_KEY_001, "./Assets/Maps/Level-001.tmj");
    }

    create(){
        super.create();

        // Create a the map
        this._tilemap = this.add.tilemap(LEVEL_KEY_001);
        this._tileset = this._tilemap.addTilesetImage('Tileset', 'tileset');

        this._layers = {
            void: this._tilemap.createLayer(
                "Void",
                this._tileset,
            ).setDepth(LAYER_VOID),

            wallsBack: this._tilemap.createLayer(
                "WallsBack",
                this._tileset,
            ).setDepth(LAYER_WALLS_BACK),

            ground: this._tilemap.createLayer(
                "Ground",
                this._tileset,
            ).setDepth(LAYER_GROUND),

            collider: this._tilemap.createLayer(
                "Collider",
                this._tileset,
            ).setDepth(-100),

            fences: this._tilemap.createLayer(
                "FencesBack",
                this._tileset,
            ).setDepth(LAYER_FENCES_BACK),

            conveyorsBack: this._tilemap.createLayer(
                "ConveyorsBack",
                this._tileset
            ).setDepth(LAYER_CONVEYORS_BACK),

            conveyorsFront: this._tilemap.createLayer(
                "ConveyorsFront",
                this._tileset
            ).setDepth(LAYER_CONVEYORS_FRONT),

            fences: this._tilemap.createLayer(
                "FencesFront",
                this._tileset,
            ).setDepth(LAYER_FENCES_FRONT),

            decorations: this._tilemap.createLayer(
                "Decorations",
                this._tileset
            ).setDepth(LAYER_DECORATIONS),

            wallsFront: this._tilemap.createLayer(
                "WallsFront",
                this._tileset
            ).setDepth(LAYER_WALLS_FRONT),
        };

        // Create a player
        this._player = new Player(this, 80, 80, {health: this._gameManager._playerStats.health});
        this._camera.setScroll(TILE_SIZE, TILE_SIZE);

        // Followed by the camera
        this._camera.startFollow(this._player);
        this._camera.setLerp(0.1);
        this._camera.setBounds(0, 0, 119 * TILE_SIZE, 90 * TILE_SIZE);

        // Create a weapon pickup
        this._pickups.add(new RiflePickup(this, 100, 100));

        // create a test entity
        //this._enemies.add(new Enemy(this, 200, 100, SPRITE_ENEMY, 1, this._player));
        //this._enemies.add(new Enemy(this, 300, 100, SPRITE_ENEMY, 1, this._player));
        //this._enemies.add(new Enemy(this, 400, 100, SPRITE_ENEMY, 1, this._player));

        // Create the collisions
        this._layers.collider.setCollisionByProperty({collides: true});
        this._layers.conveyorsFront.setCollisionByProperty({collides: true});
        this._layers.decorations.setCollisionByProperty({collides: true});

        // Apply the collisions
        this.physics.add.collider([this._enemies, this._player], [this._layers.collider, this._layers.conveyorsFront, this._layers.conveyorsBack]);

        super.afterCreate();
    }

    update(time, deltaTime){
        super.update();
    }
}