import { ADD_CONFIG_HTTPSERVICE_DATA,DEL_HTTPSERVICE_DATA,ADD_HTTPSERVICE_DATA,EDIT_HTTPSERVICE_DATA,CHANGE_HTTPSERVICE_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsHttpServiceConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_HTTPSERVICE_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_HTTPSERVICE_DATA:
            var data=action.data,_thisData=state[action.ctype],httpService=_thisData.http,thisHttp=httpService[action.index];
            thisHttp={...thisHttp,...data};
            state[action.ctype].http=[
                ...httpService.slice(0,action.index),
                thisHttp,
                ...httpService.slice(action.index+1)
            ]
            return {...state}
        case ADD_HTTPSERVICE_DATA:
            var data=action.data,_thisData=state[action.ctype],httpService=_thisData.http;
            //httpService.push(data);
            state[action.ctype].http=[...httpService,data];
            return {...state}
        case DEL_HTTPSERVICE_DATA:
            var _thisData=state[action.ctype],httpService=_thisData.http,thisHttpLevel=httpService[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisHttpLevel.length){
                for(var i=0;i<thisHttpLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisHttpLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].http=[
                ...httpService.slice(0,action.index),
                ...httpService.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_HTTPSERVICE_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val,
                _thisData=state[action.ctype],
                thisHttpService=_thisData.http[action.index],
                leves=thisHttpService.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            //console.log(thisOrigin);
            if(isCheck){
                //选中
                state[action.ctype].http[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].http[action.index].take_effect_level=[
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