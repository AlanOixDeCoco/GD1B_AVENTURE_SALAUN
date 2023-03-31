import Pickup from "../Pickups/Pickup.js";
import Bullet from "./Bullet.js";

export default class Weapon extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, parent, pivot, sprite, bulletsPerSecond, bulletSpeed, bulletDamage, maxAmmos=5){
        super(scene, parent.getWeaponOrigin.x, parent.getWeaponOrigin.y, sprite);

        this._pivot = pivot;

        this._parent = parent;

        this.scene.add.existing(this);
        this.setDepth(LAYER_WEAPONS_TOP);

        this._bulletDamage = bulletDamage;
        this._bulletsPerSecond = bulletsPerSecond;
        this._nextBulletTime = 0;

        this._bullets = [];
        this._bulletSpeed = bulletSpeed;

        this._maxAmmos = maxAmmos;
        this._ammos = this._maxAmmos;
    }
    
    Fire(target){
        if(this._ammos <= 0){
            console.log("No ammo left!");
            return;
        }

        if(this.scene.time.now > this._nextBulletTime){
            this._nextBulletTime = this.scene.time.now + ((1 / this._bulletsPerSecond) * 1000);

            this._bullets.push(new Bullet(
                this.scene, 
                this.x, this.y, 
                new Phaser.Math.Vector2(1, 0).rotate(this.rotation),
                this._bulletSpeed,
                this._bulletDamage,
                target
            ));
            this._ammos--;

            if(DEBUG) console.log(`Fire weapon! (${this._ammos}/${this._maxAmmos})`);
        }
    }

    Reload(){
        console.log("Reload weapon!");
        this._ammos = this._maxAmmos;
    }

    getAmmos() {
        return this._ammos;
    }

    setAmmos(amount){
        this._ammos = amount;
    }

    Throw(pickup = new Pickup(this.scene, this.x, this.y)){
        this.scene._pickups.add(pickup);
        this.destroy();
    }

    update(){
        var origin = this._parent.getWeaponOrigin();

        this.setDisplayOrigin(
            this.flipX ? this.width - this._pivot.x : this._pivot.x, 
            this._pivot.y
        );

        this.x = origin.x;
        this.y = origin.y;

        this.setRotation(origin.direction.angle());


        if(origin.direction.x > 0){
            this.setFlipY(false);
        }
        if(origin.direction.x < 0){
            this.setFlipY(true);
        }
        if(origin.direction.y >= 0){
            this.setDepth(LAYER_WEAPONS_TOP);
        }
        else {
            this.setDepth(LAYER_WEAPONS_BOTTOM);
        }
    }
}