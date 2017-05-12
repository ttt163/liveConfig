import { ADD_CONFIG_ORIGIN_DATA,DEL_ORIGIN_DATA,ADD_ORIGIN_DATA,EDIT_ORIGIN_DATA,CHANGE_ORIGIN_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsOriginConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_ORIGIN_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_ORIGIN_DATA:
            var data=action.data,_thisData=state[action.ctype],origin=_thisData.origin,thisOrigin=origin[action.index];
            thisOrigin={...thisOrigin,...data};
            state[action.ctype].origin=[
                ...origin.slice(0,action.index),
                thisOrigin,
                ...origin.slice(action.index+1)
            ]
            return {...state}
        case ADD_ORIGIN_DATA:
            var data=action.data,_thisData=state[action.ctype],origin=_thisData.origin;
           // origin.push(data);
            state[action.ctype].origin=[...origin,data];
            return {...state}
        case DEL_ORIGIN_DATA:
            var _thisData=state[action.ctype],origin=_thisData.origin,thisOriginLevel=origin[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisOriginLevel.length){
                for(var i=0;i<thisOriginLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisOriginLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].origin=[
                ...origin.slice(0,action.index),
                ...origin.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_ORIGIN_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val,
                _thisData=state[action.ctype],
                thisOrigin=_thisData.origin[action.index],
                leves=thisOrigin.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            //console.log(thisOrigin);
            if(isCheck){
                //选中
                state[action.ctype].origin[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].origin[action.index].take_effect_level=[
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
            //console.log({...state});
            return {...state}
        default:
            return state
    }
}