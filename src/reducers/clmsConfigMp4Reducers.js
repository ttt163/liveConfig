import { ADD_CONFIG_MP4_DATA,DEL_MP4_DATA,ADD_MP4_DATA,EDIT_MP4_DATA,CHANGE_MP4_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsMp4Config(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_MP4_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_MP4_DATA:
            var data=action.data,_thisData=state[action.ctype],mp4=_thisData.mp4,thisMp4=mp4[action.index];
            thisMp4={...thisMp4,...data};
            state[action.ctype].mp4=[
                ...mp4.slice(0,action.index),
                thisMp4,
                ...mp4.slice(action.index+1)
            ]
            return {...state}
        case ADD_MP4_DATA:
            var data=action.data,_thisData=state[action.ctype],mp4=_thisData.mp4;
            //mp4.push(data);
            state[action.ctype].mp4=[...mp4,data];
            return {...state}
        case DEL_MP4_DATA:
            var _thisData=state[action.ctype],mp4=_thisData.mp4,thisMp4Level=mp4[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisMp4Level.length){
                for(var i=0;i<thisMp4Level.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisMp4Level[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].mp4=[
                ...mp4.slice(0,action.index),
                ...mp4.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_MP4_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val, _thisData=state[action.ctype],
                thisMp4=_thisData.mp4[action.index],
                leves=thisMp4.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            /*for(var i=0;i<leves.length;i++){
                if(leves[i]==val){

                    break;
                }
            }*/
            if(isCheck){
                //选中
                state[action.ctype].mp4[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].mp4[action.index].take_effect_level=[
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