import PlayerStateMachine from "./PlayerStateMachine.js";
import { IdlePlayerState } from "./PlayerStates.js";

export default class Player {
    constructor(scene, x, y){
        this._scene = scene;

        this._sprite = scene.physics.add.sprite(x, y, "player", 0);

        this._speed = PLAYER_SPEED;

        this._input = {
            x: 0,
            y: 0,
            normalizedMovement: new Phaser.Math.Vector2(0, 0),
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false,
            grappling: false,
            glove: false,
        }

        this._animations = this.CreateAnimations();

        // setup the keys
        this._movementKeys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z, 
            up_arrow: Phaser.Input.Keyboard.KeyCodes.UP, 
            left: Phaser.Input.Keyboard.KeyCodes.Q, 
            left_arrow: Phaser.Input.Keyboard.KeyCodes.LEFT, 
            down: Phaser.Input.Keyboard.KeyCodes.S, 
            down_arrow: Phaser.Input.Keyboard.KeyCodes.DOWN, 
            right: Phaser.Input.Keyboard.KeyCodes.D, 
            right_arrow: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        this._actionKeys = scene.input.keyboard.addKeys({
            attack: Phaser.Input.Keyboard.KeyCodes.X,
            grappling: Phaser.Input.Keyboard.KeyCodes.C,
            glove: Phaser.Input.Keyboard.KeyCodes.V,
        });

        this.AssignKeyboardEvents();

        this._stateMachine = new PlayerStateMachine(this, new IdlePlayerState(this));
    }
    
    //#region Phaser methods
    update(time){
        this._stateMachine.UpdateState();
    }
    //#endregion

    //#region constructor methods
    AssignKeyboardEvents(){
        // Movement keys
        for (const [key, value] of Object.entries(this._movementKeys)) {
            value
            .on('down', this.onKeyboardMove)
            .on('up', this.onKeyboardMove)
            .context = this;
        }
        // Action keys
        this._actionKeys.attack
        .on('down', this.onAttack)
        .on('up', this.onAttack)
        .context = this;

        this._actionKeys.grappling
        .on('down', this.onGrappling)
        .on('up', this.onGrappling)
        .context = this;

        this._actionKeys.glove
        .on('down', this.onGlove)
        .on('up', this.onGlove)
        .context = this;
    }

    CreateAnimations(){
        //#region IDLE animations
        this._scene.anims.create({
            key: 'player_idle',
            frames: this._scene.anims.generateFrameNumbers('player', {start:0, end:2}),
            frameRate: 4,
            repeat: -1
        });
        //#endregion

        //#region MOVE animations
        this._scene.anims.create({
            key: 'player_move_down',
            frames: this._scene.anims.generateFrameNumbers('player', {start:5, end:9}),
            frameRate: 4,
            repeat: -1
        });

        this._scene.anims.create({
            key: 'player_move_up',
            frames: this._scene.anims.generateFrameNumbers('player', {start:10, end:14}),
            frameRate: 4,
            repeat: -1
        });
        //#endregion

        return {
            idle: "player_idle",
            
            moveUp: "player_move_up",
            moveDown: "player_move_down",
            
            grapplingUp: "player_grappling_up",
            grapplingDown: "player_grappling_down",
            
            boxingUp: "player_boxing_up",
            boxingDown: "player_boxing_down",
        };
    }
    //#endregion

    //#region input events
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

        evt.context._input.x = -evt.context._input.left + evt.context._input.right;
        evt.context._input.y = -evt.context._input.up + evt.context._input.down;
        evt.context._input.normalizedMovement = new Phaser.Math.Vector2(evt.context._input.x, evt.context._input.y).normalize();

        evt.context._input.moving = !((Math.abs(evt.context._input.x) + Math.abs(evt.context._input.y)) == 0);
    }

    onAttack(evt){
        evt.context._input.attack = evt.isDown;
    }

    onGrappling(evt){
        evt.context._input.grappling = evt.isDown;
    }

    onGlove(evt){
        evt.context._input.glove = evt.isDown;
    }
    //#endregion
}