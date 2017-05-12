import { EDIT_CLMS_TASK,SEARCH_CLMS_TASK,SHOW_CLMS_TASK,CHANGE_CLMS_CHK,CHANNEL_CHK,EDIT_ALL_LIST,DEL_CLMS_TASK_LIST,EDIT_CLMS_TASK_LIST} from '../actions/clmsActions.js'
export default function clmsTaskList(state = {}, action) {
    switch (action.type) {
        case EDIT_CLMS_TASK:
            var _data=action.data;
            return {...state,..._data}
        case SEARCH_CLMS_TASK:
            var search=state.search,actData=action.data;
            state.search={...search,...actData};
            return {...state}
        case SHOW_CLMS_TASK:
            var actData=action.data;
            state.list=actData;
            return {...state}
        case EDIT_CLMS_TASK_LIST:
            var list= state.list,thisList=list[action.index],data=action.data;
            state.list=[
                ...list.slice(0,action.index),
                {...data},
                ...list.slice(action.index+1)
            ]
            return {...state}
        case DEL_CLMS_TASK_LIST:
            var list= state.list;
            state.list=[
                ...list.slice(0,action.index),
                ...list.slice(action.index+1)
            ]
            return {...state}
        case CHANGE_CLMS_CHK:
            var actData=action.data,list=state.list,thisList=list[action.index];
            state.list=[
                ...list.slice(0,action.index),
                {...thisList,...actData},
                ...list.slice(action.index+1)
            ];
            return {...state}
        case CHANNEL_CHK:
            var _chk=action.chk,_val=action.value,channel=!state.channel_name?[]:state.channel_name;
            if(_chk){
                //选中
                channel.push(_val);
                if(channel.length==state.list.length){
                    state.allChk=true;
                }
                state.channel_name=channel;
            }else{
                //取消
                state.allChk=false;
                for(var i=0;i<channel.length;i++){
                    if(channel[i]==_val){
                        state.channel_name=[
                            ...channel.slice(0,i),
                            ...channel.slice(i+1)
                        ];
                    }
                }

            }
            return {...state}
        case EDIT_ALL_LIST:
            var acData=action.data,list=state.list,channel=!state.channel_name?[]:state.channel_name;
            state={...state,...acData};
            if(acData.allChk){
                //全选
                for(var i=0;i<list.length;i++){
                    list[i].isChk=true;
                    channel.push(list[i].channel_name);
                }

            }else{
                //全取消
                channel=[];
                for(var i=0;i<list.length;i++){
                    list[i].isChk=false;
                }

        }
            state.channel_name=channel;
            state.list=list;
            return {...state}
        default:
            return state
    }
}