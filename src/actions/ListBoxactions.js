
//列表box
export const List_Act="List_Act";
export const List_CHK="List_CHK";
export const  ALL_CHK="ALL_CHK"
export const FILTER_DATA_NAME="FILTER_DATA_NAME";

/*
 * action 创建函数
 */

//
export function listAction(data) {
    return { type: List_Act,data}
}
export function changeChk(data,index){
    return { type: List_CHK,data,index}
}
export function  changeAllChk(data){
    return { type: ALL_CHK,data}
}
//过滤数据
export function filterDataByName(data){
    return { type: FILTER_DATA_NAME, data}
}

