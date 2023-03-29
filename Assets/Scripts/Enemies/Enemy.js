import Entity from "../Components/Entity.js";

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
    }

    onStart(){
        super.onStart();
    }

    update(){
        super.update();

        this._detectionCircle.x = this.x;
        this._detectionCircle.y = this.y;

        // Animation handling
        if(this._facingUp){
            this.anims.play(this._animations.moveUp, true);
        }
        else {
            this.anims.play(this._animations.moveDown, true);
        }

        // Orientation handling
        if((this.body.velocity.y == 0) || (this.body.velocity.x != 0)){
            this.flipX = ((this.body.velocity.x) >= 0) ? false : true;
        }
        this._facingUp = ((this.body.velocity.y) < 0) ? true : false;

        if(this.body.velocity.length() == 0) {
            if(this._facingUp) this.anims.play(this._animations.idleUp, true);
            else this.anims.play(this._animations.idleDown, true);
        }

        // Update equiped weapon
        this._weapon?.update(this);

        // Move towards target
        if(this.scene.time.now < this._detectionDelay){
            this.setVelocity(this._targetDirection.x * this._speed, this._targetDirection.y * this._speed);
        }
        else {
            this.setVelocity(0, 0);
        }
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
}