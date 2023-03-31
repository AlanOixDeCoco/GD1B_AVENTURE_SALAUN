import Pickup from "./Pickup.js";

export const pickupTypes = {
    revolver: 0,
    rifle: 1
}

export class RevolverPickup extends Pickup{
    constructor(scene, x, y, properties){
        super(scene, x, y, SPRITE_WEAPON_REVOLVER, pickupTypes.revolver, properties);
    }
}

export class RiflePickup extends Pickup{
    constructor(scene, x, y, properties){
        super(scene, x, y, SPRITE_WEAPON_RIFLE, pickupTypes.rifle, properties);
    }
}