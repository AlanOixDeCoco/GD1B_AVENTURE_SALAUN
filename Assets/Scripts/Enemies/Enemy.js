import Entity from "../Components/Entity.js";
import { Rifle } from "../Weapons/Weapons.js";
import EnemyStateMachine from "./EnemyStateMachine.js";
import { IdleEnemyState } from "./EnemyStates.js";

export default class Enemy extends Entity {
    constructor(scene, x, y, spriteKey, shadowIndex, player){
        super(scene, x, y, spriteKey, shadowIndex);

        this._player = player;
        this._playerDetected = false;
        this._detectionDelay = scene.time.now;
        
        this._speed = ENEMY_SPEED;

        this._targetDirection = new Phaser.Math.Vector2(0, 0);

        this._detectionCircle = scene.add.sprite(x, y, SPRITE_ENEMY_DETECTION_RANGE);
        scene.physics.world.enable(this._detectionCircle);
        this._detectionCircle.setVisible(DEBUG);
        
        this._detectionCircle.body.isCircle = true;

        scene.physics.add.overlap(this._detectionCircle, this._player, (self, evt) => { this.onPlayerDetected(this, evt) });

        this._health = ENEMY_HEALTH;

        this._nextAttackTime = 0;

        this._stateMachine = new EnemyStateMachine(this, new IdleEnemyState(this));

        this.onStart();

        this._weapon = new Rifle(this.scene, this);
        this._weapon.update();
    }

    onStart(){
        super.onStart();
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
            key: 'enemy_idle_down',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_ENEMY, {start:0, end:3}),
            frameRate: 4,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'enemy_idle_up',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_ENEMY, {start:6, end:9}),
            frameRate: 4,
            repeat: -1
        });
        //#endregion

        //#region MOVE animations
        this.scene.anims.create({
            key: 'enemy_move_down',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_ENEMY, {start:12, end:17}),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'enemy_move_up',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_ENEMY, {start:18, end:23}),
            frameRate: 8,
            repeat: -1
        });
        //#endregion

        return {
            idleUp: "enemy_idle_up",
            idleDown: "enemy_idle_down",
            
            moveUp: "enemy_move_up",
            moveDown: "enemy_move_down",
            
            grapplingUp: "enemy_grappling_up",
            grapplingDown: "enemy_grappling_down",
            
            boxingUp: "enemy_boxing_up",
            boxingDown: "enemy_boxing_down",
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
        if(this._weapon.getAmmos() <= 0){
            this._weapon.Reload();
        }

        super.Attack(this.scene._player);
    }

    Kill(){
        this._weapon.Throw();
        this.destroy();
    }
}