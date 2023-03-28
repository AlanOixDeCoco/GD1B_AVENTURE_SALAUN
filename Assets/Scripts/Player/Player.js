import Entity from "../Components/Entity.js";
import { Revolver, Rifle } from "../Weapons/Weapons.js";
import PlayerStateMachine from "./PlayerStateMachine.js";
import { IdlePlayerState } from "./PlayerStates.js";

export default class Player extends Entity {
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_PLAYER, 0);

        this._speed = PLAYER_SPEED;

        this._weapon = null;
        // weapon anchor = offset from top-left player sprite
        this._weaponAnchor = new Phaser.Math.Vector2(4, 7);

        this._input = {
            x: 0,
            y: 0,
            movement: new Phaser.Math.Vector2(0, 0),
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false,
            grappling: false,
            glove: false,
        }

        this._animations = this.CreateAnimations();

        //#region Inputs setup
        this.AssignKeyboardEvents();
        this.AssignGamepadEvents();
        //#endregion

        this._stateMachine = new PlayerStateMachine(this, new IdlePlayerState(this));

        this.onStart();

        this._weapon = new Revolver(this.scene, this);
        this._weapon.update();
    }

    onStart(){
        super.onStart();

        this.body.setSize(8, 18);
        this.body.setOffset(5, 9);
    }
    
    update(time){
        super.update();

        if(this._gamepad) {
            if(this._gamepad.leftStick.x != 0){
                this._input.x = this._gamepad.leftStick.x > 0 ? 1 : -1;
            }
            else if((this._gamepad.left - this._gamepad.right) == 0) this._input.x = 0;

            if(this._gamepad.leftStick.y != 0){
                if(this._gamepad.leftStick.y > AXIS_THRESHOLD_VERTICAL){
                    this._input.y = 1;
                }
                else if(this._gamepad.leftStick.y < -AXIS_THRESHOLD_VERTICAL){
                    this._input.y = -1;
                }
            }
            else if((this._gamepad.up - this._gamepad.down) == 0) this._input.y = 0;
            this.CalculateJoystickMovement();
        }


        this._input.moving = !((Math.abs(this._input.x) + Math.abs(this._input.y)) == 0);

        if(this._input.attack) this._weapon.Fire();

        this._stateMachine.UpdateState();
    }

    lateUpdate(){
        super.lateUpdate();
    }

    setWeapon(weapon){
        this._weapon = weapon;
    }

    ThrowWeapon(){
        this._weapon = null;
    }

    //#region Keyboard
    AssignKeyboardEvents(){
        // Movement keys
        this._movementKeys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z, 
            up_arrow: Phaser.Input.Keyboard.KeyCodes.UP, 
            left: Phaser.Input.Keyboard.KeyCodes.Q, 
            left_arrow: Phaser.Input.Keyboard.KeyCodes.LEFT, 
            down: Phaser.Input.Keyboard.KeyCodes.S, 
            down_arrow: Phaser.Input.Keyboard.KeyCodes.DOWN, 
            right: Phaser.Input.Keyboard.KeyCodes.D, 
            right_arrow: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        for (const [key, value] of Object.entries(this._movementKeys)) {
            value
            .on('down', this.onKeyboardMove)
            .on('up', this.onKeyboardMove)
            .context = this;
        }

        // Action keys
        this._actionKeys = this.scene.input.keyboard.addKeys({
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
            grappling: Phaser.Input.Keyboard.KeyCodes.C,
            glove: Phaser.Input.Keyboard.KeyCodes.V,
        });
        
        this._actionKeys.attack
        .on('down', this.onAttack)
        .on('up', this.onAttack)
        .context = this;

        this._actionKeys.grappling
        .on('down', this.onGrappling)
        .on('up', this.onGrappling)
        .context = this;

        this._actionKeys.glove
        .on('down', this.onBoxing)
        .on('up', this.onBoxing)
        .context = this;
    }

    //#region onKeyboard events
    onKeyboardMove(evt){
        switch(evt.keyCode){
            case Phaser.Input.Keyboard.KeyCodes.Z:
            case Phaser.Input.Keyboard.KeyCodes.UP:
                evt.context._input.up = evt.isDown;
                break;

            case Phaser.Input.Keyboard.KeyCodes.S:
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                evt.context._input.down = evt.isDown;
                break;

            case Phaser.Input.Keyboard.KeyCodes.Q:
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                evt.context._input.left = evt.isDown;
                break;

            case Phaser.Input.Keyboard.KeyCodes.D:
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                evt.context._input.right = evt.isDown;
                break;
        }

        evt.context.CalculateButtonMovement();
    }
    //#endregion
    //#endregion

    //#region Gamepad
    AssignGamepadEvents(){
        // setup the controller connected/disconnected event
        this.scene.input.gamepad.on('connected', () => {
            this._gamepad = this.scene.input.gamepad.pad1;
            this.onGamepadConnect(this);
        });
        this.scene.input.gamepad.on('disconnected', this.onGamepadDisconnect, this);
    }
    onGamepadConnect(){
        console.log("Controller connected!");

        // see https://phaser.io/examples/v3/view/input/gamepad/gamepad-debug to identify the buttons indexes
        this._movementButtons = {
            up: this._gamepad[BUTTON_UP],
            down: this._gamepad[BUTTON_DOWN],
            left: this._gamepad[BUTTON_LEFT],
            right: this._gamepad[BUTTON_RIGHT],
        };

        this._actionButtons = {
            attack: this._gamepad[BUTTON_ATTACK],
            grappling: this._gamepad[BUTTON_GRAPPLING],
            glove: this._gamepad[BUTTON_BOXING],
        };

        this._gamepad.on('down', () => {
            this.onGamepadButtonDown(this);
        });
        this._gamepad.on('up', () => {
            this.onGamepadButtonDown(this);
        });
    }

    // called when the gamepad is disconnected
    onGamepadDisconnect(){
        console.log("Controller disconnected!");

        // clear the gamepad
        this._gamepad = null;
        this._isGamepadConnected = false;

        // resets inputs when disconnected
        this._input = {
            x: 0,
            y: 0,
            movement: new Phaser.Math.Vector2(0, 0),
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false,
            grappling: false,
            glove: false,
        };
    }



    //#region onGamepad events 
    onGamepadButtonDown(context){
        if(context._gamepad == null) return;

        context._input.up = context._gamepad.up;
        context._input.down = context._gamepad.down;
        context._input.left = context._gamepad.left;
        context._input.right = context._gamepad.right;

        context._input.attack = context._gamepad.attack;
        context._input.grappling = context._gamepad.grappling;
        context._input.boxing = context._gamepad.boxing;

        context.CalculateButtonMovement();
    }
    //#endregion
    
    //#endregion

    //#region onAction events
    onAttack(evt){
        if(DEBUG) console.log("Attack key triggered!");
        evt.context._input.attack = evt.isDown;
    }

    onGrappling(evt){
        if(DEBUG) console.log("Grappling key triggered!");
        evt.context._input.grappling = evt.isDown;

        evt.context.scene.SwitchScene(LEVEL_KEY_002);
    }

    onBoxing(evt){
        if(DEBUG) console.log("Boxing key triggered!");
        evt.context._input.glove = evt.isDown;
    }
    //#endregion

    //#region Input processing
    CalculateButtonMovement(){
        this._input.x = -this._input.left + this._input.right;
        this._input.y = -this._input.up + this._input.down;
        this._input.movement = new Phaser.Math.Vector2(this._input.x, this._input.y).normalize();
    }

    CalculateJoystickMovement(){
        this._input.movement = new Phaser.Math.Vector2(this._input.x, this._input.y).normalize();
    }

    ResetInputs(){
        this._input = {
            x: 0,
            y: 0,
            movement: new Phaser.Math.Vector2(0, 0),
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false,
            grappling: false,
            glove: false,
        };
    }
    //#endregion

    //#region Animations
    CreateAnimations(){
        //#region IDLE animations
        this.scene.anims.create({
            key: 'player_idle_down',
            frames: this.scene.anims.generateFrameNumbers('player', {start:0, end:3}),
            frameRate: 4,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'player_idle_up',
            frames: this.scene.anims.generateFrameNumbers('player', {start:6, end:9}),
            frameRate: 4,
            repeat: -1
        });
        //#endregion

        //#region MOVE animations
        this.scene.anims.create({
            key: 'player_move_down',
            frames: this.scene.anims.generateFrameNumbers('player', {start:12, end:17}),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'player_move_up',
            frames: this.scene.anims.generateFrameNumbers('player', {start:18, end:23}),
            frameRate: 8,
            repeat: -1
        });
        //#endregion

        return {
            idleUp: "player_idle_up",
            idleDown: "player_idle_down",
            
            moveUp: "player_move_up",
            moveDown: "player_move_down",
            
            grapplingUp: "player_grappling_up",
            grapplingDown: "player_grappling_down",
            
            boxingUp: "player_boxing_up",
            boxingDown: "player_boxing_down",
        };
    }
    //#endregion

}