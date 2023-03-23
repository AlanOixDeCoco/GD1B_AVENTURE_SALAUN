export default class GameScene extends Phaser.Scene{
    constructor(gameManager, key, name){
        super(key); // set the scene key to interact with the sceneManager
        this._name = name;
        this._gameManager = gameManager;
        this._gameManager._sceneStats.currentScene.key = key;
        this._gameManager._sceneStats.currentScene.name = name;

        this._currentRoom = {x: 0, y: 0};
    }

    // Stops the game loop and move the camera
    MoveCamera(camera, direction){
        this.scene.pause();
        
        let timeInterval = (1/CAMERA_ROOM_TRANSITION_SPEED) * 1000;
        let targetX, targetY;

        let movement;
        switch(direction){
            case "left":
                targetX = camera.scrollX - (GAME_WIDTH + ROOM_H_OFFSET);

                movement = setInterval(() => {
                    camera.scrollX--;
                    if(camera.scrollX <= targetX){
                        camera.scrollX = targetX;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetX, movement);

                this._currentRoom.x--;
                break;
            case "right":
                targetX = camera.scrollX + (GAME_WIDTH + ROOM_H_OFFSET);

                movement = setInterval(() => {
                    camera.scrollX++;
                    if(camera.scrollX >= targetX){
                        camera.scrollX = targetX;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetX, movement);

                this._currentRoom.x++;
                break;
            case "up":
                targetY = camera.scrollY - (GAME_HEIGHT + ROOM_V_OFFSET);

                movement = setInterval(() => {
                    camera.scrollY--;
                    if(camera.scrollY <= targetY){
                        camera.scrollY = targetY;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetY, movement);

                this._currentRoom.y--;
                break;
            case "down":
                targetY = camera.scrollY + (GAME_HEIGHT + ROOM_V_OFFSET);

                movement = setInterval(() => {
                    camera.scrollY++;
                    if(camera.scrollY >= targetY){
                        camera.scrollY = targetY;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetY, movement);

                this._currentRoom.y++;
                break;
        }
    }

    update(){
    };
}