import { pickupTypes } from "../Pickups/Pickups.js";

export default class GameManager{
    constructor(){
        this._playerStats = {
            health: PLAYER_HEALTH,
            weapon: {
                type: null,
                ammos: null
            },
        };

        this._sceneStats = {
            currentScene: {key: "", name: ""},
        };
    }

    setHealth(health){
        this._playerStats.health = health;
    }

    setWeapon(weapon){
        this._playerStats.weapon = weapon;
    }
}