import GameScene from "../Components/GameScene.js";
import { HorizontalAccessCardDoor, VerticalAccessCardDoor } from "../Doors/AccessCardDoor.js";
import { HorizontalBreakableDoor, VerticalBreakableDoor } from "../Doors/BreakableDoor.js";
import Enemy from "../Enemies/Enemy.js";
import Pickup from "../Pickups/Pickup.js";
import { AccessCardPickup, BossCardPickup, HalfHearthPickup, HearthPickup, NewHearthPickup, RevolverPickup, RiflePickup, pickupTypes } from "../Pickups/Pickups.js";
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
        this._camera.setBounds(0, 0, 90 * TILE_SIZE, 84 * TILE_SIZE);

        // Spawn portes
        var doorsObjectLayer = this._tilemap.getObjectLayer("Doors");
        doorsObjectLayer.objects.forEach(door => {
            if(DEBUG) console.log(`Spawning a door in (${door.x}, ${door.y}) : ${door.properties[0].name} = ${door.properties[0].value}`);
            switch(door.properties[0].value){
                case "horizontalBreakableDoor":
                    this._breakableDoors.add(new HorizontalBreakableDoor(this, door.x, door.y));
                    break;
                case "verticalBreakableDoor":
                    this._breakableDoors.add(new VerticalBreakableDoor(this, door.x, door.y));
                    break;
                case "horizontalAccessCardDoor":
                    this._accessCardDoors.add(new HorizontalAccessCardDoor(this, door.x, door.y));
                    break;
                case "verticalAccessCardDoor":
                    this._accessCardDoors.add(new VerticalAccessCardDoor(this, door.x, door.y));
                    break;
                default:
                    break;
            }
        });

        // Spawn enemies
        //var enemiesObjectLayer = this._tilemap.getObjectLayer("Enemies");
        //enemiesObjectLayer.objects.forEach(enemy => {
        //    if(DEBUG) console.log(`Spawning an enemy in (${enemy.x}, ${enemy.y}) : ${enemy.properties[0].name} = ${enemy.properties[0].value != "" ? enemy.properties[0].value : "none"}`);
        //    switch(enemy.properties[0].value){
        //        case "revolver":
        //            this._enemies.add(new Enemy(this, enemy.x, enemy.y, SPRITE_ENEMY, 1, this._player, pickupTypes.revolver));
        //            break;
        //        case "rifle":
        //            this._enemies.add(new Enemy(this, enemy.x, enemy.y, SPRITE_ENEMY, 1, this._player, pickupTypes.rifle));
        //            break;
        //        default:
        //            this._enemies.add(new Enemy(this, enemy.x, enemy.y, SPRITE_ENEMY, 1, this._player));
        //            break;
        //    }
        //});
        

        // Spawn pickups
        var pickupsObjectLayer = this._tilemap.getObjectLayer("Pickups");
        pickupsObjectLayer.objects.forEach(pickup => {
            if(DEBUG) console.log(`Spawning a pickup in (${pickup.x}, ${pickup.y}) : ${pickup.properties[0].name} = ${pickup.properties[0].value != "" ? pickup.properties[0].value : "none"}`);
            switch(pickup.properties[0].value){
                case "revolver":
                    this._pickups.add(new RevolverPickup(this, pickup.x, pickup.y));
                    break;
                case "rifle":
                    this._pickups.add(new RiflePickup(this, pickup.x, pickup.y));
                    break;

                case "halfHearth":
                    this._pickups.add(new HalfHearthPickup(this, pickup.x, pickup.y));
                    break;
                case "hearth":
                    this._pickups.add(new HearthPickup(this, pickup.x, pickup.y));
                    break;
                case "newHearth":
                    this._pickups.add(new NewHearthPickup(this, pickup.x, pickup.y));
                    break;

                case "accessCard":
                    this._pickups.add(new AccessCardPickup(this, pickup.x, pickup.y));
                    break;
                case "bossCard":
                    this._pickups.add(new BossCardPickup(this, pickup.x, pickup.y));
                    break;
                
                default:
                    break;
            }
        });

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