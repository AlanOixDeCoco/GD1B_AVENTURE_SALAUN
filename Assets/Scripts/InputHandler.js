export default class InputHandler{
    constructor(){
        this.keyboardKeys;
        this.isGamepadConnected = false;
        this.gamepad; // stores used controller
        this.gamepadButtons; // assigned when a device is connected
    }
    // configure the controller when it is connected
    onGamepadConnect(){
        console.log("Controller connected!");

        // see https://phaser.io/examples/v3/view/input/gamepad/gamepad-debug to identify the buttons indexes
        gamepadButtons = {
            'left': gamepad.buttons[14],
            'right': gamepad.buttons[15],
            'attack': gamepad.buttons[0],
            'pause': gamepad.buttons[9]
        };
        
        gamepadAxis = {
            'leftStick': gamepad.axes[0]
        };

        // register to the button press & release events to optimize input handling
        gamepad.on('down', onButton);
        gamepad.on('up', onButton);

        isGamepadConnected = true;
    }

    // called when the gamepad is disconnected
    onGamepadDisconnect(){
        console.log("Controller disconnected!");

        // clear the gamepad
        gamepad = null;
        isGamepadConnected = false;

        inputX = 0; // avoid forever moving player when disconnecting the controller while button pressed
    }

    // called when any button is pressed/released
    onButton(){
        // avoid using conditions to gain performance --> inputX is a calculation between left & right inputs
        inputX = (gamepadButtons.right.pressed) - gamepadButtons.left.pressed;
        inputJump = gamepadButtons.jump.pressed; // + converts bool to int
    }

    // called when any key is pressed/released
    onKey(){
        // avoid using conditions to gain performance --> inputX is a calculation between left & right inputs
        inputX = (keyboardKeys.right.isDown || keyboardKeys.right_arrow.isDown) - (keyboardKeys.left.isDown || keyboardKeys.left_arrow.isDown);
        inputJump = (keyboardKeys.jump.isDown || keyboardKeys.jump_arrow.isDown); // + converts bool to int
    }
}