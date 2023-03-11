import InputHandler from "./InputHandler.js";

export default class Player{
    constructor(){
        this.active = true;
        this.health = INITIAL_HEALTH;
        this.inventory = {}; // empty key:value list as inventory

        this.inputs = {
            horizontal: 0.0,
            vertical: 0.0,
            attack: false,
            interact: false,
        }
    }

    update(time){
        if(!this.active) return;
    }
}