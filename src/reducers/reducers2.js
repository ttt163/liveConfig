/**
 * Created by Administrator on 2016/9/7.
 */
import { combineReducers } from 'redux'
import { ADD_TOPO,SELECT_TOPO,REMOVE_TOPO} from '../actions/actions'
//import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters,Login } from '../actions/actions'
//const { SHOW_ALL } = VisibilityFilters

/*function visibilityFilter(state = SHOW_ALL, action) {
 switch (action.type) {
 case SET_VISIBILITY_FILTER:
 //console.log(action.filter);
 return action.filter
 default:
 return state
 }
 }
 function isLogin(state=false, action) {
 switch (action.type) {
 case Login:
 return action.bool
 default:
 return state
 }SELECT_TOPO
 }*/
function isLogin(state=false, action) {
    switch (action.type) {
        case Login:
            return action.bool
        default:
            return state
    }
}
    /*function topos(state = [], action) {
        switch (action.type) {
            case ADD_TOPO:
                //console.log(state);
                var id=1;
                return state.length?[
                    ...state,
                    {
                        topId:action.id,
                        active: false
                    }
                ]:
                    [
                        {
                            topId:action.id,
                            active: true
                        }
                    ]
            case SELECT_TOPO:
                var index="";
                for(var i=0;i<state.length;i++){
                    state[i].active=false;
                    if(state[i].topId==action.id){
                        state[i].active=true;
                        index=i;
                        //break;
                    }
                }
                // console.log(state);
                //return state;
                return [
                    ...state
                ]
            //return action.id
            /!*state=state.map(function(item){
             item.active=false;
             return item;
             });
             return [
             ...state.slice(0, action.index),
             Object.assign({}, state[action.index], {
             active: true
             }),
             ...state.slice(action.index + 1)
             ]*!/

            case REMOVE_TOPO:
                var index="";
                for(var i=0;i<state.length;i++){
                    if(state[i].topId==action.id){
                        //index=i;
                        state=[
                            ...state.slice(0, i),
                            ...state.slice(i + 1)
                        ]
                        break;
                    }
                }
                /!*state=[
                 ...state.slice(0, index),
                 ...state.slice(index + 1)
                 ]*!/
                //state[0].active=true;
                //console.log(state);
                return state;
            /!*return [
             ...state.slice(0, action.index),
             Object.assign({}, state[action.index], {
             active: true
             }),
             ...state.slice(action.index + 1)
             ]*!/




            /!* case COMPLETE_TODO:

             // console.log(...state.slice(action.index + 1));
             return [
             ...state.slice(0, action.index),
             Object.assign({}, state[action.index], {
             completed: true
             }),
             ...state.slice(action.index + 1)
             ]*!/
            default:
                return state
        }
    }*/

const loginStates = combineReducers({
    isLogin
})

export default allStates