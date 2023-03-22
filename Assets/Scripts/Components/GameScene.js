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

    // configure the controller when it is connected
    onGamepadConnect(){
        console.log("Controller connected!");

        // see https://phaser.io/examples/v3/view/input/gamepad/gamepad-debug to identify the buttons indexes
        this._gamepadButtons = {
            'up': this._gamepad.buttons[12],
            'down': this._gamepad.buttons[13],
            'left': this._gamepad.buttons[14],
            'right': this._gamepad.buttons[15],
        };

        this._isGamepadConnected = true;
    }

    // called when the gamepad is disconnected
    onGamepadDisconnect(){
        console.log("Controller disconnected!");

        // clear the gamepad
        this._gamepad = null;
        this._isGamepadConnected = false;

        this._input = {x: 0, y: 0}; // avoid forever moving player when disconnecting the controller while button pressed
    }

    update(){
        //if(this._gamepad){
        //    this._input = {
        //        x: this._gamepadButtons.right.pressed - this._gamepadButtons.left.pressed,
        //        y: this._gamepadButtons.up.pressed - this._gamepadButtons.down.pressed
        //    };
        //    return;
        //}
    };
}