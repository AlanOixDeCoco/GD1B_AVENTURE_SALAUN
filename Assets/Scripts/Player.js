import InputHandler from "./InputHandler.js";

export default class Player{
    constructor(){
        this.inputHandler = new InputHandler();
        this.active = true;
        this.health = INITIAL_HEALTH;
        this.inventory = {}; // empty key:value list as inventory
    }

    update(time){
        if(!this.active) return;

    }
}