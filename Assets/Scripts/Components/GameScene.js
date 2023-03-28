export default class GameScene extends Phaser.Scene{
    constructor(gameManager, key, name){
        super(key); // set the scene key to interact with the sceneManager
        this._name = name;
        this._gameManager = gameManager;
        this._gameManager._sceneStats.currentScene.key = key;
        this._gameManager._sceneStats.currentScene.name = name;

        this._currentRoom = {x: 0, y: 0};
    }

    create() {
        this._entities = this.add.group();
        this._pickups = this.add.group();
    }

    // Stops the game loop and move the camera
    SwitchScreen(player, camera, direction){
        this.scene.pause();
        player.ResetInputs();
        
        let timeInterval = (1/CAMERA_ROOM_TRANSITION_SPEED) * 1000;
        let targetX, targetY;

        let movement;
        switch(direction){
            case "left":
                targetX = camera.scrollX - (GAME_WIDTH + ROOM_H_OFFSET);

                movement = setInterval(() => {
                    camera.scrollX -= CAMERA_ROOM_TRANSITION_H_FACTOR;
                    if(camera.scrollX <= targetX){
                        camera.scrollX = targetX;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetX, movement);

                player.setPosition(player.x - 2 * ROOM_H_OFFSET, player.y);

                this._currentRoom.x--;
                break;
            case "right":
                targetX = camera.scrollX + (GAME_WIDTH + ROOM_H_OFFSET);

                movement = setInterval(() => {
                    camera.scrollX += CAMERA_ROOM_TRANSITION_H_FACTOR;
                    if(camera.scrollX >= targetX){
                        camera.scrollX = targetX;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetX, movement);

                player.setPosition(player.x + 2 * ROOM_H_OFFSET, player.y);

                this._currentRoom.x++;
                break;
            case "up":
                targetY = camera.scrollY - (GAME_HEIGHT + ROOM_V_OFFSET);

                movement = setInterval(() => {
                    camera.scrollY -= CAMERA_ROOM_TRANSITION_V_FACTOR;
                    if(camera.scrollY <= targetY){
                        camera.scrollY = targetY;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetY, movement);

                player.setPosition(player.x, player.y - 2 * ROOM_V_OFFSET);

                this._currentRoom.y--;
                break;
            case "down":
                targetY = camera.scrollY + (GAME_HEIGHT + ROOM_V_OFFSET);

                movement = setInterval(() => {
                    camera.scrollY += CAMERA_ROOM_TRANSITION_V_FACTOR;
                    if(camera.scrollY >= targetY){
                        camera.scrollY = targetY;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetY, movement);

                player.setPosition(player.x, player.y + 2 * ROOM_V_OFFSET);

                this._currentRoom.y++;
                break;
        }

        player._weapon?.update();
    }

    update(){
        this._entities.getChildren().forEach(entity => {
            entity.update();
        });

        //this._pickups.forEach(pickup => {
        //    pickup.update();
        //});

        if(this._player){
            if(this._player.x < this._camera.scrollX){
                this.SwitchScreen(this._player, this._camera, "left");
            }
            else if(this._player.x > this._camera.scrollX + GAME_WIDTH){
                this.SwitchScreen(this._player, this._camera, "right");
            }
            if(this._player.y < this._camera.scrollY){
                this.SwitchScreen(this._player, this._camera, "up");
            }
            else if(this._player.y > this._camera.scrollY + GAME_HEIGHT){
                this.SwitchScreen(this._player, this._camera, "down");
            }
        }
    };
}