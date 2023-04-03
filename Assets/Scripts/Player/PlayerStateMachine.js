import StateMachine from "../Components/StateMachine.js";

export default class PlayerStateMachine extends StateMachine {
    constructor(context, defaultState){
        super(context, defaultState);
        this._currentState.onEnterState();
    }

    UpdateState(){
        super.UpdateState();
    }
}