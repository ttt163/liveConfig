import { ADD_CONFIG_HLS_DATA,DEL_HLS_DATA,ADD_HLS_DATA,EDIT_HLS_DATA,CHANGE_HLS_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsHlsConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_HLS_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_HLS_DATA:
            var data=action.data,_thisData=state[action.ctype],hls=_thisData.hls,thisHls=hls[action.index];
            thisHls={...thisHls,...data};
            state[action.ctype].hls=[
                ...hls.slice(0,action.index),
                thisHls,
                ...hls.slice(action.index+1)
            ]
            return {...state}
        case ADD_HLS_DATA:
            var data=action.data,_thisData=state[action.ctype],hls=_thisData.hls;
            //hls.push(data);
            state[action.ctype].hls=[...hls,data];
            return {...state}
        case DEL_HLS_DATA:
            var _thisData=state[action.ctype],hls=_thisData.hls,thisHlsLevel=hls[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisHlsLevel.length){
                for(var i=0;i<thisHlsLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisHlsLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].hls=[
                ...hls.slice(0,action.index),
                ...hls.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_HLS_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val, _thisData=state[action.ctype],
                thisHls=_thisData.hls[action.index],
                leves=thisHls.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            /*for(var i=0;i<leves.length;i++){
                if(leves[i]==val){

                    break;
                }
            }*/
            if(isCheck){
                //选中
                state[action.ctype].hls[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].hls[action.index].take_effect_level=[
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