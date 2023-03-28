export default class GameManager{
    constructor(){
        this._playerStats = {
            health: 3,
            currentWeapon: null,
        };

        this._sceneStats = {
            currentScene: {key: "", name: ""},
        };
    }
}