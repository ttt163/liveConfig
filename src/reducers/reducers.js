/**
 * Created by Administrator on 2016/9/7.
 */
import { combineReducers } from 'redux'
import {topos} from "./topoReducers.js"
import { ADD_TOPO,SELECT_TOPO,REMOVE_TOPO,Login,INIT_USER} from '../actions/actions'
function isLogin(state=[], action) {
    switch (action.type) {
        case  INIT_USER:

            var data=action.data;
           // Object.values(field)
            for(var [k,v] of Object.entries(data)){
                data[k]="";
            }
           // console.log(data);
            return {...state,"user":data}
        case Login:
            console.log(state);
           //console.log(state);
            //console.log(action.text);
            //for(var i=0;i<state.user.length;i++){
                //console.log(Object.entries(state[i]));
                for (let [key, value] of Object.entries(state.user)) {
                    // do something with key|value
                    //console.log(key, value);
                }
              /*  for (let [index, elem] of state[i].entries()) {
                    console.log(index, elem);
                }*/
           // }
            /*var _k=action.text.key;
            for(var key in state[0])

            {
                if(key==_k){
                    state[0][key]=action.text.value;
                }

                //console.log("Key是:" + key);

                //console.log("对应的值是:" + state[0][key]);

            }*/
           // console.log(state);

            /*state.map(function(k,v){
                console.log(v);
            })*/
            return state
        default:
            return state
    }
}
function topos(state = [], action) {
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
        /*state=state.map(function(item){
         item.active=false;
         return item;
         });
         return [
         ...state.slice(0, action.index),
         Object.assign({}, state[action.index], {
         active: true
         }),
         ...state.slice(action.index + 1)
         ]*/

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
            /*state=[
             ...state.slice(0, index),
             ...state.slice(index + 1)
             ]*/
            //state[0].active=true;
            //console.log(state);
            return state;
        /*return [
         ...state.slice(0, action.index),
         Object.assign({}, state[action.index], {
         active: true
         }),
         ...state.slice(action.index + 1)
         ]*/




        /* case COMPLETE_TODO:

         // console.log(...state.slice(action.index + 1));
         return [
         ...state.slice(0, action.index),
         Object.assign({}, state[action.index], {
         completed: true
         }),
         ...state.slice(action.index + 1)
         ]*/
        default:
            return state
    }
}
const allStates = combineReducers({
        topos,
        isLogin
    }

)

export default allStates