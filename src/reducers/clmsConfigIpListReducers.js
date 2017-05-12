import { ADD_CONFIG_IPLIST_DATA,DEL_IPLIST_DATA,ADD_IPLIST_DATA,EDIT_IPLIST_DATA,CHANGE_IPLIST_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsIpListConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_IPLIST_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_IPLIST_DATA:
            var data=action.data,_thisData=state[action.ctype],ipList=_thisData.ip_list,thisIpList=ipList[action.index];
            thisIpList={...thisIpList,...data};
            state[action.ctype].ip_list=[
                ...ipList.slice(0,action.index),
                thisIpList,
                ...ipList.slice(action.index+1)
            ]
            return {...state}
        case ADD_IPLIST_DATA:
            var data=action.data,_thisData=state[action.ctype],ipList=_thisData.ip_list;
            //ipList.push(data);
            state[action.ctype].ip_list=[...ipList,data];
            return {...state}
        case DEL_IPLIST_DATA:
            var _thisData=state[action.ctype],ipList=_thisData.ip_list,thisIpListLevel=ipList[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisIpListLevel.length){
                for(var i=0;i<thisIpListLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisIpListLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].ip_list=[
                ...ipList.slice(0,action.index),
                ...ipList.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_IPLIST_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val, _thisData=state[action.ctype],
                thisIpList=_thisData.ip_list[action.index],
                leves=thisIpList.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            /*for(var i=0;i<leves.length;i++){
                if(leves[i]==val){

                    break;
                }
            }*/
            if(isCheck){
                //选中
                state[action.ctype].ip_list[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].ip_list[action.index].take_effect_level=[
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