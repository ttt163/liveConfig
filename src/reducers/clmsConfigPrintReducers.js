import { ADD_CONFIG_PRINT_DATA,DEL_PRINT_DATA,ADD_PRINT_DATA,EDIT_PRINT_DATA,CHANGE_PRINT_CONFIG_LEVEL} from '../actions/clmsConfigActions.js'
export default function clmsPrintConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_PRINT_DATA:
            var data=action.data,_thisData=state[action.ctype];
            state[action.ctype]={..._thisData,...data}
            return {...state}
        case EDIT_PRINT_DATA:
            var data=action.data,_thisData=state[action.ctype],pithyPrint=_thisData.pithy_print,thisPrint=pithyPrint[action.index];
            thisPrint={...thisPrint,...data};
            state[action.ctype].pithy_print=[
                ...pithyPrint.slice(0,action.index),
                thisPrint,
                ...pithyPrint.slice(action.index+1)
            ]
            return {...state}
        case ADD_PRINT_DATA:
            var data=action.data,_thisData=state[action.ctype],pithyPrint=_thisData.pithy_print;
           // pithyPrint.push(data);
            state[action.ctype].pithy_print=[...pithyPrint,data];
            return {...state}
        case DEL_PRINT_DATA:
            var _thisData=state[action.ctype],pithyPrint=_thisData.pithy_print,thisPrintLevel=pithyPrint[action.index].take_effect_level,existLevel=state[action.ctype].exist_level;
           // console.log(thisChannelLevel);
            if(thisPrintLevel.length){
                for(var i=0;i<thisPrintLevel.length;i++){
                   // console.log(thisChannelLevel[i]);
                    var index=existLevel.findIndex((value, index, arr)=>value==thisPrintLevel[i]);
                    if(index!=-1){
                        existLevel=[
                            ...existLevel.slice(0,index),
                            ...existLevel.slice(index+1)
                        ]
                    }
                }
                state[action.ctype].exist_level= existLevel;
            }
            state[action.ctype].pithy_print=[
                ...pithyPrint.slice(0,action.index),
                ...pithyPrint.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_PRINT_CONFIG_LEVEL:
            var isCheck=action.isCheck,val=action.val, _thisData=state[action.ctype],
                thisPrint=_thisData.pithy_print[action.index],
                leves=thisPrint.take_effect_level,
                existLevel=state[action.ctype].exist_level;
            /*for(var i=0;i<leves.length;i++){
                if(leves[i]==val){

                    break;
                }
            }*/
            if(isCheck){
                //选中
                state[action.ctype].pithy_print[action.index].take_effect_level=[...leves,val];
                state[action.ctype].exist_level=[...existLevel,val];
            }else{
                //取消
                var index=leves.findIndex((value, index, arr)=>value==val);
                //if(index!=-1){
                    state[action.ctype].pithy_print[action.index].take_effect_level=[
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