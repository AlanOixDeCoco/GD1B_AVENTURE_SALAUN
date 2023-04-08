import Entity from "../Components/Entity.js";
import Pickup from "../Pickups/Pickup.js";
import { pickupTypes } from "../Pickups/Pickups.js";
import { Revolver, Rifle } from "../Weapons/Weapons.js";
import PlayerStateMachine from "./PlayerStateMachine.js";
import { IdlePlayerState, MovingPlayerState } from "./PlayerStates.js";

export default class Player extends Entity {
    constructor(scene, x, y, properties){
        super(scene, x, y, SPRITE_PLAYER, 1);

        // weapon anchor = offset from top-left player sprite
        this._weaponAnchor = new Phaser.Math.Vector2(2, 4);

        this._speed = PLAYER_SPEED;
        
        this._health = properties.health;
        this._maxHealth = properties.health;

        this._accessCards = 0;
        this._bossCard = 0;

        this._input = {
            x: 0,
            y: 0,
            movement: new Phaser.Math.Vector2(0, 0),
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false,
            interact: false,
            drop: false,
            special: false
        }

        this._ui = {
            playerAnimation: this.scene.add.sprite(
                POS_UI_PLAYER_ANIMATION.x,
                POS_UI_PLAYER_ANIMATION.y,
                SPRITE_PLAYER,
                0
            ).setOrigin(0).setDepth(LAYER_UI).setScrollFactor(0),

            hearths: [
            ],

            ammosBackground: this.scene.add.sprite(
                POS_UI_AMMOS_BG.x,
                POS_UI_AMMOS_BG.y,
                SPRITE_AMMOS_BG_UI,
                0
            ).setOrigin(0).setDepth(LAYER_UI).setScrollFactor(0),

            ammosTextCurrent: this.scene.add.bitmapText(
                POS_UI_AMMOS_CURRENT_TEXT.x, 
                POS_UI_AMMOS_CURRENT_TEXT.y, 
                'CursedScript', 
                '00', 
                FONT_SIZE_X1
            ).setOrigin(0).setDepth(LAYER_UI_TEXT).setScrollFactor(0).setTint(COLOR_AMMOS_NORMAL_AMMOS).setDropShadow(0, 1),

            ammosTextMax: this.scene.add.bitmapText(
                POS_UI_AMMOS_MAX_TEXT.x,
                POS_UI_AMMOS_MAX_TEXT.y,
                'CursedScript', 
                '/00', 
                FONT_SIZE_X1
            ).setOrigin(0).setDepth(LAYER_UI_TEXT).setScrollFactor(0).setTint(COLOR_AMMOS_MAX).setDropShadow(0, 1),
        };

        this._uiAnimations = this.CreateUIAnimations();

        this.UpdateHearthUI();
        

        //#region Inputs setup
        this.AssignKeyboardEvents();
        this.AssignGamepadEvents();
        //#endregion

        this._stateMachine = new PlayerStateMachine(this, new MovingPlayerState(this));

        this.onStart();

        this._weapon = null;

        switch(this.scene._gameManager._playerStats.weapon.type){
            case pickupTypes.revolver:
                this._weapon = new Revolver(this.scene, this);
                this._weapon.setAmmos(this.scene._gameManager._playerStats.weapon.ammos);
                break;
            case pickupTypes.rifle:
                this._weapon = new Rifle(this.scene, this);
                this._weapon.setAmmos(this.scene._gameManager._playerStats.weapon.ammos);
                break;
            default:
                break;
        }

        this._weapon?.update();
    }

    onStart(){
        super.onStart();

        this.body.setSize(14, 20);
        this.body.setOffset(13, 12);
    }
    
    update(time){
        super.update();

        //#region Inputs handling
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
        //#endregion

        this._stateMachine.UpdateState();

        if((this._weapon) && this._input.drop){
            this._weapon.Throw();
            this._weapon = null;
        }

        this.UpdateAmmosUI();
    }

    lateUpdate(){
        super.lateUpdate();
    }

    UpdateHearthUI(){
        this._ui.hearths.forEach(hearth => {
            hearth.destroy();
        });

        this._ui.hearths = [];

        for(var i = 0; i < (this._health - 0.5); i++){
            this._ui.hearths.push(
                this.scene.add.sprite(
                    POS_UI_HEARTHS.x + (i * SPACING_UI_HEARTHS),
                    POS_UI_HEARTHS.y,
                    SPRITE_HEARTH_UI,
                    0
                ).setOrigin(0).setDepth(LAYER_UI).setScrollFactor(0)
            );
        }
        if(this._health % 1 > 0){
            this._ui.hearths.push(
                this.scene.add.sprite(
                    POS_UI_HEARTHS.x + (this._ui.hearths.length * SPACING_UI_HEARTHS),
                    POS_UI_HEARTHS.y,
                    SPRITE_HEARTH_UI,
                    1
                ).setOrigin(0).setDepth(LAYER_UI).setScrollFactor(0).anims.play(this._uiAnimations.hearthHalf)
            );
        }
    }

    UpdateAmmosUI(){
        this._ui.ammosBackground.setVisible(this._weapon);
        this._ui.ammosTextCurrent.setVisible(this._weapon);
        this._ui.ammosTextMax.setVisible(this._weapon);

        if(!this._weapon) {
            return;
        }

        // Text content
        var currentAmmosText = String(this._weapon.getAmmos());
        if(currentAmmosText.length < 2){
            currentAmmosText = "0" + currentAmmosText;
        }

        var maxAmmosText = String(this._weapon.getMaxAmmos());
        if(maxAmmosText.length < 2){
            maxAmmosText = "0" + maxAmmosText;
        }
        maxAmmosText = "/" + maxAmmosText;

        // Change text color
        if(this._weapon.getAmmos() <= 0){
            this._ui.ammosTextCurrent.setTint(COLOR_AMMOS_NO_AMMO);
        }
        else if(this._weapon.getAmmos() <= LOW_AMMOS_AMOUNT){
            this._ui.ammosTextCurrent.setTint(COLOR_AMMOS_LOW_AMMOS);
        }
        else {
            this._ui.ammosTextCurrent.setTint(COLOR_AMMOS_NORMAL_AMMOS);
        }

        // Assign text content
        this._ui.ammosTextCurrent.setText(currentAmmosText);
        this._ui.ammosTextMax.setText(maxAmmosText);
    }

    TakeDamage(amount, invincibleDuration){
        super.TakeDamage(amount / 2, invincibleDuration);
        this.scene._gameManager.setHealth(this._health);

        this.UpdateHearthUI();
    }

    Attack(target){
        if(this._weapon?.getAmmos() <= 0){
            this.ShowFloatingUI(this._floatingUIAnimations.noammo);
        }

        super.Attack(target);

        if(this._weapon) this.scene._gameManager.setWeapon({type: this._weapon._weaponType, ammos: this._weapon._ammos});
    }

    Heal(amount){
        this._health += amount;
        if(this._health > this._maxHealth) this._health = this._maxHealth;
        this.scene._gameManager.setHealth(this._health);
        this.UpdateHearthUI();
    }

    Pick(pickup){
        this._input.interact = false;

        if(DEBUG) console.log(pickup);

        switch(pickup._pickupType){
            case pickupTypes.revolver:
                if(this._weapon) this._weapon.Throw();
                this._weapon = new Revolver(this.scene, this);
                if(pickup._properties?.ammos != null) this._weapon.setAmmos(pickup._properties.ammos);
                break;
            case pickupTypes.rifle:
                if(this._weapon) this._weapon.Throw();
                this._weapon = new Rifle(this.scene, this);
                if(pickup._properties?.ammos != null) this._weapon.setAmmos(pickup._properties.ammos);
                break;

            case pickupTypes.halfHearth:
                this.Heal(0.5);
                break;
            case pickupTypes.hearth:
                this.Heal(1);
                break;
            case pickupTypes.newHearth:
                this._maxHealth += 1;
                this._health = this._maxHealth;
                this.scene._gameManager.setHealth(this._health);
                this.UpdateHearthUI();
                break;

            case pickupTypes.accessCard:
                this._accessCards++;
                break;
            case pickupTypes.bossCard:
                this._bossCard++;
                break;

            default:
                console.log("Unknown pickup object!");
                break;
        }
        
        pickup.destroy();
        this._weapon.update();
        this.scene._gameManager.setWeapon({type: this._weapon._weaponType, ammos: this._weapon._ammos});
    }

    Kill(){
        console.log("Player died!");
        this.update = () => {};

        this.scene._camera.fadeOut(CAMERA_FADE_OUT_DURATION, 0, 0, 0, () => {
            setTimeout(() => {
                this.scene.SwitchScene(GAMEOVERSCENE_KEY);
            }, CAMERA_FADE_OUT_DURATION);
        });
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
            interact: Phaser.Input.Keyboard.KeyCodes.E,
            drop: Phaser.Input.Keyboard.KeyCodes.F,
            special: Phaser.Input.Keyboard.KeyCodes.G,
        });
        
        this._actionKeys.attack
        .on('down', this.onAttack)
        .on('up', this.onAttack)
        .context = this;

        this._actionKeys.interact
        .on('down', this.onInteract)
        .on('up', this.onInteract)
        .context = this;

        this._actionKeys.drop
        .on('down', this.onDrop)
        .on('up', this.onDrop)
        .context = this;

        this._actionKeys.special
        .on('down', this.onSpecial)
        .on('up', this.onSpecial)
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
            interact: false,
            drop: false,
            special: false
        };
    }



    //#region onGamepad events 
    onGamepadButtonDown(context){
        if(context._gamepad == null) return;

        context._input.up = context._gamepad.isButtonDown(BUTTON_UP);
        context._input.down = context._gamepad.isButtonDown(BUTTON_DOWN);
        context._input.left = context._gamepad.isButtonDown(BUTTON_LEFT);
        context._input.right = context._gamepad.isButtonDown(BUTTON_RIGHT);

        context._input.attack = context._gamepad.isButtonDown(BUTTON_ATTACK);

        if(context._gamepad.isButtonDown(BUTTON_INTERACT)){
            context._input.interact = context._gamepad.isButtonDown(BUTTON_INTERACT);
        }

        context._input.drop = context._gamepad.isButtonDown(BUTTON_DROP);
        context._input.special = context._gamepad.isButtonDown(BUTTON_SPECIAL);

        context.CalculateButtonMovement();
    }
    //#endregion
    
    //#endregion

    //#region onAction events
    onAttack(evt){
        evt.context._input.attack = evt.isDown;
    }

    onInteract(evt){
        evt.context._input.interact = evt.isDown;
    }

    onDrop(evt){
        evt.context._input.drop = evt.isDown;
    }

    onSpecial(evt){
        evt.context._input.special = evt.isDown;
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
            key: 'player_idle',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_PLAYER, {start:0, end:4}),
            frameRate: 3,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'player_idle_weapon',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_PLAYER, {start:10, end:14}),
            frameRate: 3,
            repeat: -1
        });
        //#endregion

        //#region MOVE animations
        this.scene.anims.create({
            key: 'player_move',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_PLAYER, {start:20, end:29}),
            frameRate: 14,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'player_move_weapon',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_PLAYER, {start:30, end:39}),
            frameRate: 14,
            repeat: -1
        });
        //#endregion

        return {
            idleWeapon: "player_idle_weapon",
            idle: "player_idle",
            
            moveWeapon: "player_move_weapon",
            move: "player_move",
            
            grapplingWeapon: "player_grappling_up",
            grappling: "player_grappling_down",
        };
    }

    CreateUIAnimations(){
        //#region Hearth animations
        this.scene.anims.create({
            key: 'ui_hearth_full',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_HEARTH_UI, {start:0, end:0}),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ui_hearth_half',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_HEARTH_UI, {start:1, end:1}),
            frameRate: 4,
            repeat: -1
        });
        //#endregion

        return {
            hearthFull: "ui_hearth_full",
            hearthHalf: "ui_hearth_half",
        };
    }

    destroy(){
        super.destroy();
        this._ui.playerAnimation.destroy();
        this._ui.ammosBackground.destroy();
        this._ui.ammosTextCurrent.destroy();
        this._ui.ammosTextMax.destroy();
        this._ui.hearths.forEach((hearth) => {
            hearth.destroy();
        });
    }
    //#endregion

}