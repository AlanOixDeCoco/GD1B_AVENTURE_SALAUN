export default class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey, shadowIndex = 0){
        super(scene, x, y, spriteKey, 0);
        
        scene.physics.world.enable(this);

        this._health = ENTITY_HEALTH;

        this._invincible = false;

        if(shadowIndex >= 0){
            this._shadow = scene.add.image(
                this.getBottomCenter().x, 
                this.getBottomCenter().y + OFFSET_SHADOW_Y, 
                SPRITE_SHADOWS,
                shadowIndex
            ).setDepth(LAYER_SHADOWS);
        }

        this._floatingUI = scene.add.sprite(
            this.getTopCenter().x, 
            this.getTopCenter().y + OFFSET_FLOATING_UI_Y, 
            SPRITE_FLOATING_UI,
        ).setDepth(LAYER_FLOATING_UI).setVisible(false);

        this._facingUp == false;

        this._weapon = null;

        // weapon anchor = offset from top-left player sprite
        this._weaponAnchor = new Phaser.Math.Vector2(-8, 0);

        this._animations = this.CreateAnimations();

        this._floatingUIAnimations = this.CreateFloatingUIAnimations();

        this.onStart();
    }

    destroy(){
        super.destroy();
        this._shadow?.destroy();
        this._weapon?.destroy();
        this._floatingUI?.destroy();
    }

    onStart(){
        this.scene.add.existing(this);
        this.setDepth(LAYER_ENTITIES);
        this.setBounce(0);
    }

    update(){
        if(this._shadow){
            this._shadow.x = this.getBottomCenter().x;
            this._shadow.y = this.getBottomCenter().y + OFFSET_SHADOW_Y;
        }
        this._floatingUI.x = this.getTopCenter().x;
        this._floatingUI.y = this.getTopCenter().y + OFFSET_FLOATING_UI_Y;
    }

    Attack(target){
        if(this._weapon){
            this._weapon.Fire(target);
        }
    }

    getWeaponOrigin(){
        var origin = {
            x: 0,
            y: this.y + this._weaponAnchor.y, 
            flipX: this.flipX, 
            direction: this.body.velocity.clone().normalize()
        };

        origin.x = this.flipX ? this.x - this._weaponAnchor.x : this.x + this._weaponAnchor.x;

        return origin;
    }

    setHealth(health){
        this._health = health;
    }

    ShowFloatingUI(anim){
        this._floatingUI.setVisible(true);
        this._floatingUI.anims.play(anim, true);
    }

    HideFloatingUI(){
        this._floatingUI.setVisible(false);
    }

    TakeDamage(amount, invincibleDuration){
        if(this._invincible) return;

        this.scene._camera.shake(CAMERA_SHAKE_HIT_DURATION, CAMERA_SHAKE_HIT_INTENSITY * amount);

        this._health -= amount;

        if(this._health <= 0){
            this.Kill();
        }

        this._invincible = true;
        
        this._invincibility = setInterval(() => {
            if(this.alpha > 0){
                this.setAlpha(0);
            }
            else {
                this.clearAlpha();
            }
            
        }, INVINCIBLE_BLINK_INTERVAL, this);

        setTimeout(() => {
            this._invincible = false;
            this.clearAlpha();
            clearInterval(this._invincibility);
        }, invincibleDuration);
    }

    Kill(){
        console.log("Entity died!");
    }

    //#region FloatingUI Animations
    CreateFloatingUIAnimations(){
        //#region UI animations
        this.scene.anims.create({
            key: "floating_ui_exclamation",
            frames: this.scene.anims.generateFrameNumbers(SPRITE_FLOATING_UI, {start:0, end:3}),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: "floating_ui_pick",
            frames: this.scene.anims.generateFrameNumbers(SPRITE_FLOATING_UI, {start:4, end:7}),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: "floating_ui_noammo",
            frames: this.scene.anims.generateFrameNumbers(SPRITE_FLOATING_UI, {start:8, end:11}),
            frameRate: 6,
            repeat: 0
        });

        // events
        this._floatingUI.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'floating_ui_noammo', () => {
            this.HideFloatingUI();
        });

        //#endregion
        return {
            exclamation: "floating_ui_exclamation",
            pick: "floating_ui_pick",
            noammo: "floating_ui_noammo",
        };
    }
    //#endregion
}