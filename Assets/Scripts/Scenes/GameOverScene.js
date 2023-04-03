import GameScene from "../Components/GameScene.js";

export default class GameOverScene extends GameScene{
    constructor(gameManager){
        super(gameManager, GAMEOVERSCENE_KEY, GAMEOVERSCENE_KEY);
    }

    create(){
        this.add.bitmapText(
            GAME_WIDTH / 2, 
            (GAME_HEIGHT / 2) - 12, 
            'CursedScript', 
            'You died!', 
            FONT_SIZE_X3
        ).setOrigin(.5, .5).setCenterAlign();

        this.add.bitmapText(
            GAME_WIDTH / 2, 
            (GAME_HEIGHT / 2) + 12, 
            'CursedScript', 
            'ctrl + R / F5 to retry', 
            FONT_SIZE_X1
        ).setOrigin(.5, .5).setCenterAlign();
    }
}