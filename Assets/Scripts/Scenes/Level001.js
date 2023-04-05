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
        this._tileset = this._tilemap.addTilesetImage('Placeholder', 'tileset');

        this._layers = {
            ground: this._tilemap.createLayer(
                "Ground",
                this._tileset,
            ).setDepth(LAYER_GROUND),

            walls: this._tilemap.createLayer(
                "Walls",
                this._tileset
            ).setDepth(LAYER_WALLS),

            conveyorsBot: this._tilemap.createLayer(
                "ConveyorsBottom",
                this._tileset
            ).setDepth(LAYER_CONVEYORS_BOTTOM),

            conveyorsTop: this._tilemap.createLayer(
                "ConveyorsTop",
                this._tileset
            ).setDepth(LAYER_CONVEYORS_TOP),
        };

        // Create a player
        this._player = new Player(this, 80, 80, {health: this._gameManager._playerStats.health});
        this._camera.setScroll(TILE_SIZE, TILE_SIZE);

        // Followed by the camera
        this._camera.startFollow(this._player);
        this._camera.setLerp(0.1);
        this._camera.setBounds(0, 0, 119 * TILE_SIZE, 90 * TILE_SIZE);

        // Create a weapon pickup
        this._pickups.add(new RiflePickup(this, 150, 100));

        // create a test entity
        this._enemies.add(new Enemy(this, 200, 100, SPRITE_ENEMY, 1, this._player));
        this._enemies.add(new Enemy(this, 300, 100, SPRITE_ENEMY, 1, this._player));
        this._enemies.add(new Enemy(this, 400, 100, SPRITE_ENEMY, 1, this._player));

        // Create the collisions
        this._layers.walls.setCollisionByProperty({collides: true});
        this._layers.conveyorsBot.setCollisionByProperty({collides: true});
        this._layers.conveyorsTop.setCollisionByProperty({collides: true});

        // Apply the collisions
        this.physics.add.collider([this._enemies, this._player], [this._layers.walls, this._layers.conveyorsBot, this._layers.conveyorsTop]);
        this.physics.add.collider([this._enemies, this._player], this._layers.conveyorsBot); 
        //this.physics.add.collider([this._enemies, this._player], this._layers.conveyorsTop); 

        super.afterCreate();
    }

    update(time, deltaTime){
        super.update();
    }
}