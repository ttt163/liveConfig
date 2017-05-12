import { ADD_CONFIG_CHANNEL_DATA,EDIT_CHANNEL_DATA,ADD_CHANNEL_DATA,DEL_CHANNEL_DATA,CHANGE_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsChannelConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_CHANNEL_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_CHANNEL_DATA:
            var data=action.data,_thisData=state[action.ctype],channel=_thisData.channel,thisChann=channel[action.index];
            thisChann={...thisChann,...data};
            state[action.ctype].channel=[
                ...channel.slice(0,action.index),
                thisChann,
                ...channel.slice(action.index+1)
            ]
            return {...state}
        case ADD_CHANNEL_DATA:
            var data=action.data,_thisData=state[action.ctype],channel=_thisData.channel;
            //channel.push(data);
            state[action.ctype].channel=[...channel,data];
            return {...state}
        case DEL_CHANNEL_DATA:
            var _thisData=state[action.ctype],channel=_thisData.channel,thisChannelLevel=channel[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisChannelLevel.length){
                for(var i=0;i<thisChannelLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisChannelLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].channel=[
                ...channel.slice(0,action.index),
                ...channel.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val, _thisData=state[action.ctype],thisChannel=_thisData.channel[action.index],leves=thisChannel.take_effect_level,existLevel=state[action.ctype].exist_level;
            /*for(var i=0;i<leves.length;i++){
                if(leves[i]==val){

                    break;
                }
            }*/
            if(isCheck){
                //选中
               // leves.push(val);
                //leves=[...leves,val]
                //state[action.ctype].channel[action.index].take_effect_level.push(val);
                state[action.ctype].channel[action.index].take_effect_level=[...leves,val];
                //state[action.ctype].exist_level.push(val);
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].channel[action.index].take_effect_level=[
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