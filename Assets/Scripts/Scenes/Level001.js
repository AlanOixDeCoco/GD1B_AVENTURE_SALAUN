import Entity from "../Components/Entity.js";
import GameScene from "../Components/GameScene.js";
import Player from "../Player/Player.js";

export default class Level001 extends GameScene{
    constructor(gameManager){
        super(gameManager, LEVEL_KEY_001, LEVEL_NAME_001);
    }

    preload(){
        this.load.tilemapTiledJSON(LEVEL_KEY_001, "./Assets/Maps/Level001/Level-001.tmj");
        this.load.image('tileset', "./Assets/Maps/Placeholder.png");

        this.load.spritesheet(SPRITE_PLAYER, "./Assets/Sprites/playerSpritesheet.png", {frameWidth: 20, frameHeight: 28});
        this.load.spritesheet(SPRITE_SHADOWS, "./Assets/Sprites/shadows.png", {frameWidth: 32, frameHeight: 8});

        this.load.image(SPRITE_WEAPON_REVOLVER, "./Assets/Sprites/weapon_revolver.png");
        this.load.image(SPRITE_WEAPON_RIFLE, "./Assets/Sprites/weapon_rifle.png");
        this.load.image(SPRITE_BULLET, "./Assets/Sprites/bullet.png");
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
        this._player = new Player(this, 118, 56);

        // create a test entity
        this._entities.add(new Entity(this, 100, 100, SPRITE_ENNEMY, -1));
        this._entities.add(new Entity(this, 200, 100, SPRITE_ENNEMY, -1));
        this._entities.add(new Entity(this, 300, 100, SPRITE_ENNEMY, -1));
        this._entities.add(new Entity(this, 400, 100, SPRITE_ENNEMY, -1));
        this._entities.add(new Entity(this, 500, 100, SPRITE_ENNEMY, -1));
        this._entities.add(new Entity(this, 600, 100, SPRITE_ENNEMY, -1));

        // Create the collisions
        this._layers.walls.setCollisionByProperty({collides: true});
        this.physics.add.collider([this._entities, this._player], this._layers.walls, () => { console.log("Collides!"); });
        this.physics.add.collider(this._player, this._entities, () => { console.log("Collides!"); });

        this._camera.setScroll(TILE_SIZE, TILE_SIZE);
    }

    update(time, deltaTime){
        super.update();
        this._player.update();
    }
}