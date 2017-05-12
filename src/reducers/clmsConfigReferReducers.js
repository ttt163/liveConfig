import { ADD_CONFIG_REFER_DATA,DEL_REFER_DATA,ADD_REFER_DATA,EDIT_REFER_DATA,CHANGE_REFER_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsReferConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_REFER_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_REFER_DATA:
            var data=action.data,_thisData=state[action.ctype],refer=_thisData.refer,thisRefer=refer[action.index];
            thisRefer={...thisRefer,...data};
            state[action.ctype].refer=[
                ...refer.slice(0,action.index),
                thisRefer,
                ...refer.slice(action.index+1)
            ]
            return {...state}
        case ADD_REFER_DATA:
            var data=action.data,_thisData=state[action.ctype],refer=_thisData.refer;
            //refer.push(data);
            state[action.ctype].refer=[...refer,data];
            return {...state}
        case DEL_REFER_DATA:
            var _thisData=state[action.ctype],refer=_thisData.refer,thisReferLevel=refer[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisReferLevel.length){
                for(var i=0;i<thisReferLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisReferLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].refer=[
                ...refer.slice(0,action.index),
                ...refer.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_REFER_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val, _thisData=state[action.ctype],
                thisRefer=_thisData.refer[action.index],
                leves=thisRefer.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            /*for(var i=0;i<leves.length;i++){
                if(leves[i]==val){

                    break;
                }
            }*/
            if(isCheck){
                //选中
                state[action.ctype].refer[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_leve=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].refer[action.index].take_effect_level=[
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