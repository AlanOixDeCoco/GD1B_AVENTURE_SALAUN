import { RevolverPickup, RiflePickup } from "../Pickups/Pickups.js";
import Weapon from "./Weapon.js";

export class Revolver extends Weapon{
    constructor(scene, parent){
        super(scene, parent, new Phaser.Math.Vector2(4, 7), SPRITE_WEAPON_REVOLVER, 4, 300, 2, 10);
    }

    Throw(){
        super.Throw(new RevolverPickup(this.scene, this.x, this.y, {ammos: this._ammos}));
    }
}

export class Rifle extends Weapon{
    constructor(scene, parent){
        super(scene, parent, new Phaser.Math.Vector2(6, 6), SPRITE_WEAPON_RIFLE, 6, 200, 1, 20);
    }

    Throw(){
        super.Throw(new RiflePickup(this.scene, this.x, this.y, {ammos: this._ammos}));
    }
}