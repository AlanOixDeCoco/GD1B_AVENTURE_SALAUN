import Weapon from "./Weapon.js";

export default class Revolver extends Weapon{
    constructor(scene, parent){
        super(scene, parent, new Phaser.Math.Vector2(4, 5), SPRITE_WEAPON_REVOLVER);
    }
}