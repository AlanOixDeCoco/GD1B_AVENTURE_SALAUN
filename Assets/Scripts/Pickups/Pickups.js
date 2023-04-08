import Pickup from "./Pickup.js";

export const pickupTypes = {
    revolver: 0,
    rifle: 1,
    halfHearth: 2,
    hearth: 3,
    newHearth: 4,
    accessCard: 5,
    bossCard: 6,
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

export class HalfHearthPickup extends Pickup{
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_HALF_HEARTH_PICKUP, pickupTypes.halfHearth);
    }
}

export class HearthPickup extends Pickup{
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_HEARTH_PICKUP, pickupTypes.hearth);
    }
}

export class NewHearthPickup extends Pickup{
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_NEW_HEARTH_PICKUP, pickupTypes.newHearth);
    }
}

export class AccessCardPickup extends Pickup{
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_ACCESS_CARD_PICKUP, pickupTypes.accessCard);
    }
}

export class BossCardPickup extends Pickup{
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_BOSS_CARD_PICKUP, pickupTypes.bossCard);
    }
}