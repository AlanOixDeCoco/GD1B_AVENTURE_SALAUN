export default class GameManager{
    constructor(){
        this._gameStats = {
            active: true,
        };

        this._playerStats = {
            health: 3,
            currentWeapon: null,
        };

        this._sceneStats = {
            currentScene: {key: "", name: ""},
        };
    }
    
    GetGameScene(){
        return this._sceneStats.currentScene;
    }

    GetGameState(){
        return this._gameStats.active;
    }
}