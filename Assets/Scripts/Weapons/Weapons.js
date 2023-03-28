import Weapon from "./Weapon.js";

export class Revolver extends Weapon{
    constructor(scene, parent){
        super(scene, parent, new Phaser.Math.Vector2(4, 7), SPRITE_WEAPON_REVOLVER, 4, 300);
    }
}

export class Rifle extends Weapon{
    constructor(scene, parent){
        super(scene, parent, new Phaser.Math.Vector2(6, 6), SPRITE_WEAPON_RIFLE, 8, 200);
    }
}