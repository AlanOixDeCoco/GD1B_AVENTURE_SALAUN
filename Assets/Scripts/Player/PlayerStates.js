import State from "../Components/State.js";

export class IdlePlayerState extends State {
    constructor(context){
        super(context);
    }

    onEnterState(){
        this._context.x = Math.round(this._context.x);
        this._context.y = Math.round(this._context.y);

        // Update equiped weapon
        this._context._weapon?.update(this);

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

        if(this._context._input.special && this._context._hasGrapple){
            this._context._stateMachine.SwitchState(new UseGrapplePlayerState(this._context));
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

    Update(){
        //#region states transitions
        if(!this._context._input.moving){
            this._context._stateMachine.SwitchState(new IdlePlayerState(this._context));
            return;
        }

        if(this._context._input.special && this._context._hasGrapple){
            this._context._stateMachine.SwitchState(new UseGrapplePlayerState(this._context));
            return;
        }
        //#endregion

        this._context._input.lastMovement = this._context._input.movement;

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

export class UseGrapplePlayerState extends State {
    constructor(context){
        super(context);
    }

    onEnterState(){
        if(DEBUG) console.log("Enter Grapple Use State!\n");

        this._context.x = Math.round(this._context.x);
        this._context.y = Math.round(this._context.y);

        this._context.anims.play(this._context._animations.idle, true);

        // Throw the grapple in front of the player
        var grapplingHook = this._context.scene.add.sprite(this._context.x, this._context.y, SPRITE_GRAPPLING_HOOK).setDepth(1000);
        this._context.scene.physics.world.enable(grapplingHook);
        this._context.scene.add.existing(this);
        grapplingHook.body.velocity = this._context._input.lastMovement.clone().scale(GRAPPLING_HOOK_SPEED);

        // then resets the player velocity
        this._context.body.setVelocity(0, 0);

        // destroy the grappling hook and go back to idle state after too much time
        var timeout = setTimeout(() => {
            grapplingHook.destroy();
            this._context._stateMachine.SwitchState(new IdlePlayerState(this._context));
        }, GRAPPLING_HOOK_LIFETIME);

        // create the collision between the hook and the grips
        this._context.scene.physics.add.overlap(grapplingHook, this._context.scene._grips, (grappling_hook, grip) => {
            switch(grip._gripType){
                case "grip":
                    this._context.setPosition(grip.x, grip.y - 16);
                    break;
                case "lever":
                    grip.Pull();
                    break;
            }
            clearTimeout(timeout);
            grapplingHook.destroy();
            this._context._stateMachine.SwitchState(new IdlePlayerState(this._context));
        });

        // and the collisions with the other colliders
        this._context.scene.physics.add.collider(grapplingHook, this._context.scene._layers.collider, () => { grapplingHook.destroy(); });
        this._context.scene.physics.add.collider(grapplingHook, this._context.scene._layers.decorations, () => { grapplingHook.destroy(); });
        this._context.scene.physics.add.collider(grapplingHook, this._context.scene._accessCardDoors, () => { grapplingHook.destroy(); });
        this._context.scene.physics.add.collider(grapplingHook, this._context.scene._bossDoors, () => { grapplingHook.destroy(); });
    }
}


export class StairsPlayerState extends State {
    constructor(context){
        super(context);
    }

    onEnterState(){
        if(this._context._weapon){
            this._context.anims.play(this._context._animations.moveWeapon);
        }
        else {
            this._context.anims.play(this._context._animations.move);
        }

        this._context.body.setVelocity(10, 0);
        setInterval(() => {
            this._context.setAlpha(this._context.alpha - 0.1);
            this._context._shadow.setAlpha(this._context.alpha - 0.1);
        }, 100);
    }

    Update(){
        // Update equiped weapon
        this._context._weapon?.update(this);
    }
}