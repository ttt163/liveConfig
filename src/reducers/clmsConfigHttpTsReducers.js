import { ADD_CONFIG_HTTPTS_DATA,DEL_HTTPTS_DATA,ADD_HTTPTS_DATA,EDIT_HTTPTS_DATA,CHANGE_HTTPTS_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsHttpTsConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_HTTPTS_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_HTTPTS_DATA:
            var data=action.data,_thisData=state[action.ctype],httpTs=_thisData.http_ts,thisHttpTs=httpTs[action.index];
            thisHttpTs={...thisHttpTs,...data};
            state[action.ctype].http_ts=[
                ...httpTs.slice(0,action.index),
                thisHttpTs,
                ...httpTs.slice(action.index+1)
            ]
            return {...state}
        case ADD_HTTPTS_DATA:
            var data=action.data,_thisData=state[action.ctype],httpTs=_thisData.http_ts;
            //httpTs.push(data);
            state[action.ctype].http_ts=[...httpTs,data];
            return {...state}
        case DEL_HTTPTS_DATA:
            var _thisData=state[action.ctype],httpTs=_thisData.http_ts,thisTsLevel=httpTs[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisTsLevel.length){
                for(var i=0;i<thisTsLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisTsLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].http_ts=[
                ...httpTs.slice(0,action.index),
                ...httpTs.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_HTTPTS_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val, _thisData=state[action.ctype],
                thisHttpTs=_thisData.http_ts[action.index],
                leves=thisHttpTs.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            /*for(var i=0;i<leves.length;i++){
                if(leves[i]==val){

                    break;
                }
            }*/
            if(isCheck){
                //选中
                state[action.ctype].http_ts[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].http_ts[action.index].take_effect_level=[
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