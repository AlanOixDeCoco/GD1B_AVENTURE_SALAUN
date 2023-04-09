import Entity from "../Components/Entity.js";
import { BulletsPickup, pickupTypes } from "../Pickups/Pickups.js";
import { Revolver, Rifle } from "../Weapons/Weapons.js";
import EnemyStateMachine from "./EnemyStateMachine.js";
import { DetectedEnemyState, IdleEnemyState } from "./EnemyStates.js";

export default class Enemy extends Entity {
    constructor(scene, x, y, spriteKey, shadowIndex, player, weaponType){
        super(scene, x, y, spriteKey, shadowIndex);

        this._player = player;
        this._playerDetected = false;
        this._detectionDelay = scene.time.now;

        this._weaponAnchor = new Phaser.Math.Vector2(2, 4);
        
        this._speed = ENEMY_SPEED;

        this._targetDirection = new Phaser.Math.Vector2(0, 0);

        this._detectionCircle = scene.add.sprite(x, y, SPRITE_ENEMY_DETECTION_RANGE);
        scene.physics.world.enable(this._detectionCircle);
        this._detectionCircle.setVisible(DEBUG);
        
        this._detectionCircle.body.isCircle = true;

        scene.physics.add.overlap(this._detectionCircle, this._player, (self, evt) => { this.onPlayerDetected(this, evt) });

        this._health = ENEMY_HEALTH;

        this._nextAttackTime = 0;

        this._stateMachine = new EnemyStateMachine(this, new DetectedEnemyState(this));

        this.onStart();

        switch(weaponType){
            case pickupTypes.revolver: 
                this._weapon = new Revolver(this.scene, this);
                break;
            case pickupTypes.rifle:
                this._weapon = new Rifle(this.scene, this);
                break;
            default:
                break;
        }

        this._weapon?.update();
    }

    onStart(){
        super.onStart();

        this.body.setSize(14, 24);
        this.body.setOffset(10, 8);
    }

    update(){
        super.update();

        this._stateMachine.UpdateState();
    }

    destroy(){
        super.destroy();
        this._detectionCircle.destroy();
    }

    CreateAnimations(){
        //#region IDLE animations
        this.scene.anims.create({
            key: 'enemy_idle',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_ENEMY, {start:0, end:4}),
            frameRate: 3,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'enemy_idle_weapon',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_ENEMY, {start:10, end:14}),
            frameRate: 3,
            repeat: -1
        });
        //#endregion

        //#region MOVE animations
        this.scene.anims.create({
            key: 'enemy_move',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_ENEMY, {start:20, end:29}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'enemy_move_weapon',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_ENEMY, {start:30, end:39}),
            frameRate: 10,
            repeat: -1
        });
        //#endregion

        return {
            idle: "enemy_idle",
            idleWeapon: "enemy_idle_weapon",
            
            move: "enemy_move",
            moveWeapon: "enemy_move_weapon",
        };
    }

    onPlayerDetected(self){
        self.DetectPlayer(ENEMY_RANGE_DETECTION_DELAY);        
    }

    DetectPlayer(delay){
        this._detectionDelay = this.scene.time.now + delay;

        this._targetDirection.setTo(this.x - this._player.x, this.y - this._player.y);
        this._targetDirection.negate();
        this._targetDirection.normalize();
    }

    TakeDamage(amount){
        this.DetectPlayer(ENEMY_HIT_DETECTION_DELAY);
        super.TakeDamage(amount, INVINCIBLE_DURATION_ENEMY);
    }

    Attack(){
        if(this._weapon?.getAmmos() <= ENEMY_MINIMUM_AMMOS){
            this._weapon.Reload();
        }

        super.Attack(this.scene._player);
    }

    Kill(){
        if(this._weapon) this._weapon.Throw();
        else {
            if(Math.random() > ENEMY_BULLETS_DROP_PROBA){
                this.scene._pickups.add(new BulletsPickup(this.scene, this.x, this.y));
            }
        }
        
        this.destroy();
    }
}