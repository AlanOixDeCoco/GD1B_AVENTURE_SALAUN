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

        this._scenesData = {
            level001: {
                completed: false,
                doors: [false, false, false, false],
                cards: [false, false],
                pickups: [false, ]
            },
            level002: {
                doors: [false, false, false, false],
                cards: [false, false],
            },
        }
    }

    setHealth(health){
        this._playerStats.health = health;
    }

    setWeapon(weapon){
        this._playerStats.weapon = weapon;
    }
}