import Entity from "../Components/Entity.js";
import GameScene from "../Components/GameScene.js";
import Enemy from "../Enemies/Enemy.js";
import Ennemy from "../Enemies/Enemy.js";
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

        // Create scene camera
        this._camera = this.cameras.add(0, 0, GAME_WIDTH, GAME_HEIGHT, true);
        this._camera.setBackgroundColor(0x333333);

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
        };

        // Create a player
        this._player = new Player(this, 80, 80);
        this._camera.setScroll(TILE_SIZE, TILE_SIZE);

        // create a test entity
        this._enemies.add(new Enemy(this, 200, 100, SPRITE_ENEMY, 1, this._player));

        // Create the collisions
        this._layers.walls.setCollisionByProperty({collides: true});
        this.physics.add.collider([this._enemies, this._player], this._layers.walls);
        this.physics.add.collider(this._player, this._enemies, () => {
            if(DEBUG) console.log("Player collides with enemy!");
            this._player._weapon?.update();
        });
    }

    update(time, deltaTime){
        super.update();
    }
}