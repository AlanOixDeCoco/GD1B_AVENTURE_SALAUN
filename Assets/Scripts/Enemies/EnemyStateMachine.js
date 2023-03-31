import StateMachine from "../Components/StateMachine.js";

export default class EnemyStateMachine extends StateMachine {
    constructor(context, defaultState){
        super(context, defaultState);
        this._currentState.onEnterState();
    }
}