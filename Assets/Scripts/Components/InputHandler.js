export default class InputHandler{
    constructor(){
        this.keyboardKeys;
        this.isGamepadConnected = false;
        this.gamepad; // stores used controller

        // inputs (peripheral independant)
        this.inputs = {
            horizontal: 0.0,
            vertical: 0.0,
            attack: false,
            interact: false,
        }

        this.input.gamepad.on('connected', () => {
            this.gamepad = this.input.gamepad.pad1;
            InputHandler.onGamepadConnect();
        });

        this.input.gamepad.on('disconnected', InputHandler.onGamepadDisconnect);
    }

    getInputs(){
        return this.inputs;
    }

    // configure the controller when it is connected
    static onGamepadConnect(){
        console.log("Controller connected!");

        // see https://phaser.io/examples/v3/view/input/gamepad/gamepad-debug to identify the buttons indexes
        this.gamepadButtons = {
            top: gamepad.buttons[1],
            bottom: gamepad.buttons[1],
            left: gamepad.buttons[14],
            right: gamepad.buttons[15],
            
            attack: gamepad.buttons[0],
            pause: gamepad.buttons[9]
        };
        
        this.gamepadAxis = {
            leftStick: gamepad.axes[0]
        };

        // register to the button press & release events to optimize input handling
        this.gamepad.on('down', onButton);
        this.gamepad.on('up', onButton);

        this.isGamepadConnected = true;
    }

    // called when the gamepad is disconnected
    static onGamepadDisconnect(){
        console.log("Controller disconnected!");

        // clear the gamepad
        this.gamepad = null;
        this.isGamepadConnected = false;

        inputX = 0; // avoid forever moving player when disconnecting the controller while button pressed
    }

    // called when any button is pressed/released
    static onButton(){
        // avoid using conditions to gain performance --> inputX is a calculation between left & right inputs
        inputX = (gamepadButtons.right.pressed) - gamepadButtons.left.pressed;
        inputJump = gamepadButtons.jump.pressed; // + converts bool to int
    }

    // called when any key is pressed/released
    static onKey(){
        // avoid using conditions to gain performance --> inputX is a calculation between left & right inputs
        inputX = (keyboardKeys.right.isDown || keyboardKeys.right_arrow.isDown) - (keyboardKeys.left.isDown || keyboardKeys.left_arrow.isDown);
        inputJump = (keyboardKeys.jump.isDown || keyboardKeys.jump_arrow.isDown); // + converts bool to int
    }
}