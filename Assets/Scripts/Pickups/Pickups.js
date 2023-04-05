import Pickup from "./Pickup.js";

export const pickupTypes = {
    revolver: 0,
    rifle: 1,
    halfHearth: 2,
    hearth: 3,
    newHearth: 4,
}

export class RevolverPickup extends Pickup{
    constructor(scene, x, y, properties){
        super(scene, x, y, SPRITE_WEAPON_REVOLVER_PICKUP, pickupTypes.revolver, properties);
    }
}

export class RiflePickup extends Pickup{
    constructor(scene, x, y, properties){
        super(scene, x, y, SPRITE_WEAPON_RIFLE_PICKUP, pickupTypes.rifle, properties);
    }
}