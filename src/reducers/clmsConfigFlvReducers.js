import { ADD_CONFIG_FLV_DATA,DEL_FLV_DATA,ADD_FLV_DATA,EDIT_FLV_DATA,CHANGE_FLV_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsFlvConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_FLV_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_FLV_DATA:
            var data=action.data,_thisData=state[action.ctype],flv=_thisData.flv,thisFlv=flv[action.index];
            thisFlv={...thisFlv,...data};
            state[action.ctype].flv=[
                ...flv.slice(0,action.index),
                thisFlv,
                ...flv.slice(action.index+1)
            ]
            return {...state}
        case ADD_FLV_DATA:
            var data=action.data,_thisData=state[action.ctype],flv=_thisData.flv;
            //flv.push(data);
            state[action.ctype].flv=[...flv,data];
            return {...state}
        case DEL_FLV_DATA:
            var _thisData=state[action.ctype],flv=_thisData.flv,thisFlvLevel=flv[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisFlvLevel.length){
                for(var i=0;i<thisFlvLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisFlvLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].flv=[
                ...flv.slice(0,action.index),
                ...flv.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_FLV_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val, _thisData=state[action.ctype],
                thisFlv=_thisData.flv[action.index],
                leves=thisFlv.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            /*for(var i=0;i<leves.length;i++){
                if(leves[i]==val){

                    break;
                }
            }*/
            if(isCheck){
                //选中
                state[action.ctype].flv[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].flv[action.index].take_effect_level=[
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
        default:
            return state
    }
}