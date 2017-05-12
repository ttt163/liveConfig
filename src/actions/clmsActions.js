//查询clms任务接口
export const SEARCH_CLMS_TASK="SEARCH_CLMS_TASK";
export const SHOW_CLMS_TASK="SHOW_CLMS_TASK";
export const ADD_SEND_DATA="ADD_SEND_DATA";
export const CHANGE_CHK="CHANGE_CHK"
export const EDIT_CLMS_TASK="EDIT_CLMS_TASK";
export const CHANGE_CLMS_CHK="CHANGE_CLMS_CHK";
export const CHANNEL_CHK="CHANNEL_CHK";
export const EDIT_ALL_LIST="EDIT_ALL_LIST";
export const DEL_CLMS_TASK_LIST="DEL_CLMS_TASK_LIST";
export const EDIT_CLMS_TASK_LIST="EDIT_CLMS_TASK_LIST";

//添加频道配置
export const ADD_CLMS_CHANNEL="ADD_CLMS_CHANNEL";
//export const EDIT_SEARCH_DEVGROUP="EDIT_SEARCH_DEVGROUP";

/*
 * action 创建函数
 */

//clms
export function editClmsTask(data){
    return { type: EDIT_CLMS_TASK, data}
}
export function searchClmsTask(data){
    return { type: SEARCH_CLMS_TASK, data}
}
export function showClmsTask(data){
    return { type: SHOW_CLMS_TASK, data}
}
export function delClmsTaskList(index){
    return { type: DEL_CLMS_TASK_LIST, index}
}
export function editClmsTaskList(data,index){
    return { type: EDIT_CLMS_TASK_LIST,data, index}
}

export function changeClmsChk(data,index){
    return { type: CHANGE_CLMS_CHK, data,index}
}
export function channelChk(chk,value){
    return { type: CHANNEL_CHK, chk,value}
}
export function editAllList(data){
    return { type: EDIT_ALL_LIST, data}
}

//添加频道配置
export function addClmsChannel(data){
    return { type: ADD_CLMS_CHANNEL, data}
}

//重新下发
export function addSendData(data){
    return { type: ADD_SEND_DATA, data}
}
export function changeDataChk(data,index){
    return { type: CHANGE_CHK, data,index}
}

