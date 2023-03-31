import State from "../Components/State.js";

export class IdleEnemyState extends State {
    constructor(context){
        super(context);
    }

    onEnterState(){
        if(DEBUG) console.log("Enemy enters Idle State!\n");

        this._context._detectionCircle.x = this._context.x;
        this._context._detectionCircle.y = this._context.y;

        this._context._detectionCircle.setScale(1);

        this._context.body.setVelocity(0, 0);

        // animations
        if(this._context._facingUp){
            this._context.anims.play(this._context._animations.idleUp);
        }
        else {
            this._context.anims.play(this._context._animations.idleDown);
        }

        // Orientation handling
        if((this._context.body.velocity.y == 0) || (this._context.body.velocity.x != 0)){
            this._context.flipX = ((this._context.body.velocity.x) >= 0) ? false : true;
        }
        this._context._facingUp = ((this._context.body.velocity.y) < 0) ? true : false;

        if(this._context.body.velocity.length() == 0) {
            if(this._context._facingUp) this._context.anims.play(this._context._animations.idleUp, true);
            else this._context.anims.play(this._context._animations.idleDown, true);
        }

        this._context.HideFloatingUI();
    }

    Update(){
        //#region states transitions
        if(this._context.scene.time.now < this._context._detectionDelay){
            this._context._stateMachine.SwitchState(new DetectedEnemyState(this._context));
            return;
        }
        //#endregion

        this._context._detectionCircle.x = this._context.x;
        this._context._detectionCircle.y = this._context.y;

        // Update equiped weapon
        this._weapon?.update(this);
    }
}

export class DetectedEnemyState extends State{
    constructor(context){
        super(context);
    }

    onEnterState(){
        if(DEBUG) console.log("Enemy enters Detected State!\n");

        this._context._detectionCircle.x = this._context.x;
        this._context._detectionCircle.y = this._context.y;

        this._context._detectionCircle.setScale(ENEMY_DETECTED_RANGE_FACTOR);

        this._context.body.setVelocity(0, 0);

        if(this._context._facingUp){
            this._context.anims.play(this._context._animations.idleUp);
        }
        else {
            this._context.anims.play(this._context._animations.idleDown);
        }

        this._context.ShowFloatingUI(this._context._floatingUIAnimations.exclamation);
    }

    Update(){
        //#region states transitions
        if(this._context.scene.time.now > this._context._detectionDelay){
            this._context._stateMachine.SwitchState(new IdleEnemyState(this._context));
            return;
        }
        //#endregion

        this._context._detectionCircle.x = this._context.x;
        this._context._detectionCircle.y = this._context.y;

        // move towards target
        this._context.setVelocity(this._context._targetDirection.x * this._context._speed, this._context._targetDirection.y * this._context._speed);

        // Update equiped weapon
        this._context._weapon?.update(this._context);

        // attacks at random rate
        if(this._context.scene.time.now > this._context._nextAttackTime){
            if(DEBUG) console.log(`Ennemy attack!`);

            this._context.Attack();
            
            var delay = ENEMY_ATTACK_DELAY.min + (Math.random() * (ENEMY_ATTACK_DELAY.max - ENEMY_ATTACK_DELAY.min));
            this._context._nextAttackTime = this._context.scene.time.now + delay;
        }
    }
}