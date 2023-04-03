import State from "../Components/State.js";

export class IdlePlayerState extends State {
    constructor(context){
        super(context);
    }

    onEnterState(){
        if(DEBUG) console.log("Enter Idle State!\n");

        this._context.x = Math.round(this._context.x);
        this._context.y = Math.round(this._context.y);

        this._context.body.setVelocity(0, 0);

        if(this._context._weapon){
            this._context.anims.play(this._context._animations.idleWeapon);
        }
        else {
            this._context.anims.play(this._context._animations.idle);
        }
    }

    Update(){
        //#region states transitions
        if(this._context._input.moving){
            this._context._stateMachine.SwitchState(new MovingPlayerState(this._context));
            return;
        }
        //#endregion

        if(this._context._input.attack) this._context.Attack(this._context.scene._enemies);
    }
}

export class MovingPlayerState extends State {
    constructor(context){
        super(context);
    }

    onEnterState(){
        if(DEBUG) console.log("Enter Moving State!\n");
    }

    Update(){
        //#region states transitions
        if(!this._context._input.moving){
            this._context._stateMachine.SwitchState(new IdlePlayerState(this._context));
            return;
        }
        //#endregion

        // Set velocity
        this._context.body.setVelocity(
            this._context._input.movement.x * this._context._speed,
            this._context._input.movement.y * this._context._speed
        );

        // Animation handling
        if(this._context._weapon){
            this._context.anims.play(this._context._animations.moveWeapon, true);
        }
        else {
            this._context.anims.play(this._context._animations.move, true);
        }

        // Orientation handling
        if((this._context._input.y == 0) || (this._context.body.velocity.x != 0)){
            this._context.flipX = ((this._context.body.velocity.x) > 0) ? false : true;
        }
        this._context._facingUp = ((this._context.body.velocity.y) < 0) ? true : false;

        // Update equiped weapon
        this._context._weapon?.update(this);

        if(this._context._input.attack) this._context.Attack(this._context.scene._enemies);
    }
}

export class GrapplingPlayerState extends State {
    constructor(context){
        super(context);
    }

    onEnterState(){
        if(DEBUG) console.log("Enter Grappling State!\n");
    }
}

export class BoxingPlayerState extends State {
    constructor(context){
        super(context);
    }

    onEnterState(){
        if(DEBUG) console.log("Enter Boxing State!\n");
    }
}