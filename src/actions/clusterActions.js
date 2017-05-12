//集群
export const ADD_CLUSTER="ADD_CLUSTER";
//export const EDIT_CLUSTER="EDIT_CLUSTER";
export const ADD_LEVEL="ADD_LEVEL";
export const DEL_LEVEL="DEL_LEVEL";
//export const CLEAR_LEVEL="CLEAR_LEVEL";
export const EDIT_LEVEL="EDIT_LEVEL"
//export const ADD_CLUSTER="ADD_CLUSTER";

export const SHOW_CLUS_LIST="SHOW_CLUS_LIST";
export const EDIT_CLUS_SEARCH="EDIT_CLUS_SEARCH"
//集群
export function addCluster(data) {
    return { type: ADD_CLUSTER,data}
}
export function addLevel(data,index) {
    return { type: ADD_LEVEL,data,index}
}
export function editLevel(data,index) {
    return { type: EDIT_LEVEL,data,index}
}
export function delLevel(index,len){
    return { type: DEL_LEVEL,index,len}
}
//集群列表
export function showCluster(data){
    return { type: SHOW_CLUS_LIST,data}
}
export function editClusSearch(data){
    return { type: EDIT_CLUS_SEARCH,data}
}
/*export function clearLevel(index){
    return { type: CLEAR_LEVEL,index}
}*/

