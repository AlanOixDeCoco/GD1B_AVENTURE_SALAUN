import StateMachine from "../Components/StateMachine.js";
import { IdlePlayerState, MovingPlayerState, GrapplingPlayerState, BoxingPlayerState } from "./PlayerStates.js";

export default class PlayerStateMachine extends StateMachine {
    constructor(context, defaultState){
        super(context, defaultState);
        this._currentState.onEnterState();
    }

    UpdateState(){
        super.UpdateState();
    }
}