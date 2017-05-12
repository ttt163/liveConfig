import { ADD_SEND_DATA,CHANGE_CHK} from '../actions/clmsActions.js'
export default function clmsTask(state = {}, action) {
    switch (action.type) {
        case ADD_SEND_DATA:
            var actData=action.data;
            return {...state,...actData}
        case CHANGE_CHK:
            var _data=action.data,devDatas=state.selectDatas,thisDev=devDatas[action.index],devs=state.dev_id;
            state.selectDatas[action.index]={...thisDev,..._data};
            if(_data.isChk){
                state.dev_id.push(thisDev["_id"]);
            }else{
                // keys
                state.dev_id=[...devs.slice(0,action.index),...devs.slice(action.index+1)];
            }
            //state.device_ids={devs.slice(0,action.index),dev.slice(action.index+1)}
            return {...state}
        default:
            return state
    }
}
