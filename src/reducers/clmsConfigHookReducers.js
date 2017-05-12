import { ADD_CONFIG_HTTPHOOK_DATA,DEL_HTTPHOOK_DATA,ADD_HTTPHOOK_DATA,EDIT_HTTPHOOK_DATA,CHANGE_HTTPHOOK_CONFIG_LEVEL,
    DEL_HOOK_DATA,ADD_HOOK_DATA,EDIT_HOOK_DATA,ADD_HOOK_EVENT_DATA,EDIT_HTTPHOOK} from '../actions/clmsConfigActions.js'
export default function clmsHookConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_HTTPHOOK_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_HTTPHOOK:
            var data=action.data,_thisData=state[action.ctype],httpHook=_thisData.http_hook,thisHttpHook=httpHook[action.index];
            thisHttpHook={...thisHttpHook,...data};
            state[action.ctype].http_hook=[
                ...httpHook.slice(0,action.index),
                thisHttpHook,
                ...httpHook.slice(action.index+1)
            ]
            return {...state}
        case EDIT_HTTPHOOK_DATA:
            var data=action.data,_thisData=state[action.ctype],httpHook=_thisData.http_hook,thisHttpHook=httpHook[action.index],thisHttpHookData=thisHttpHook.hook_global;
            thisHttpHook.hook_global={...thisHttpHookData,...data};
            state[action.ctype].http_hook=[
                ...httpHook.slice(0,action.index),
                thisHttpHook,
                ...httpHook.slice(action.index+1)
            ]
            return {...state}
        case ADD_HTTPHOOK_DATA:
            var data=action.data,_thisData=state[action.ctype],httpHook=_thisData.http_hook;
            //httpHook.push(data);
            state[action.ctype].http_hook=[...httpHook,data];
            return {...state}
        case DEL_HTTPHOOK_DATA:
            var _thisData=state[action.ctype],httpHook=_thisData.http_hook,thisHttpHookLevel=httpHook[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisHttpHookLevel.length){
                for(var i=0;i<thisHttpHookLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisHttpHookLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].http_hook=[
                ...httpHook.slice(0,action.index),
                ...httpHook.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_HTTPHOOK_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val, _thisData=state[action.ctype],
                thisHttpHook=_thisData.http_hook[action.index],
                leves=thisHttpHook.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            /*for(var i=0;i<leves.length;i++){
                if(leves[i]==val){

                    break;
                }
            }*/
            if(isCheck){
                //选中
                state[action.ctype].http_hook[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].http_hook[action.index].take_effect_level=[
                        ...leves.slice(0,index),
                        ...leves.slice(index+1)
                    ]
                var existIndex=existLevel.findIndex((value, index, arr)=>value==val);
                state[action.ctype].exist_level=[
                    ...existLevel.slice(0,existIndex),
                    ...existLevel.slice(existIndex+1)
                ]
               // }
            }
            return {...state}
        //hook增删改
        case DEL_HOOK_DATA:
            var _thisData=state[action.ctype],
                httpHook=_thisData.http_hook,
                thisHttpHook=httpHook[action.index],
                currHook=thisHttpHook.hook_event[action.currHook],
                hooks=currHook.hook;
            state[action.ctype].http_hook[action.index].hook_event[action.currHook].hook=[
                ...hooks.slice(0,action.hookIndex),
                ...hooks.slice(action.hookIndex+1)
            ]
            return {...state}
        case ADD_HOOK_DATA:
            //state[action.ctype].http_hook[action.index].hook_event[action.currHook].hook.push(action.data);
            var _thisData=state[action.ctype],
                httpHook=_thisData.http_hook,
                thisHttpHook=httpHook[action.index],
                currHook=thisHttpHook.hook_event[action.currHook],
                hooks=currHook.hook,
                data=action.data;
            state[action.ctype].http_hook[action.index].hook_event[action.currHook].hook=[...hooks,data];
            return {...state}
        case EDIT_HOOK_DATA:
            var _thisData=state[action.ctype],
                httpHook=_thisData.http_hook,
                thisHttpHook=httpHook[action.index],
                currHook=thisHttpHook.hook_event[action.currHook],
                hooks=currHook.hook,
                thisHook=hooks[action.hookIndex],
                data=action.data;
            state[action.ctype].http_hook[action.index].hook_event[action.currHook].hook=[
                ...hooks.slice(0,action.hookIndex),
                {...thisHook,...data},
                ...hooks.slice(action.hookIndex+1)
            ]
            return {...state}
        case ADD_HOOK_EVENT_DATA:
            var _thisData=state[action.ctype],
                httpHook=_thisData.http_hook,
                thisHttpHook=httpHook[action.index],
                hookEvent=thisHttpHook.hook_event,
                currHook=hookEvent[action.currHook],
                data=action.data;
            state[action.ctype].http_hook[action.index].hook_event=[
                ...hookEvent.slice(0,action.currHook),
                {...currHook,...data},
                ...hookEvent.slice(action.currHook+1)
            ]
            return {...state}
        default:
            return state
    }
}