export default class StateMachine{
    constructor(context){
        this._context = context;
        this._states;
        this._currentState;
    }

    UpdateState(){
        this._currentState.Update();
    }

    SwitchState(nextState){
        var lastState = this._currentState;
        this._currentState = nextState;
        
        lastState.onExitState();
        this._currentState.onEnterState();
    }
}