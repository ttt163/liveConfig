/**
 * 设备action
 */
/*
 * action 类型11
 */
export const INIT_USER='INIT_USER';
/*export const EDIT_TOPO = 'EDIT_TOPO';
export const ADD_TOPO = 'ADD_TOPO';
export const SELECT_TOPO = 'SELECT_TOPO';
export const REMOVE_TOPO = 'REMOVE_TOPO';
export const INIT_USER='INIT_USER';
export const ADD_TOPO_DEFULT_IPS="ADD_TOPO_DEFULT_IPS"
export const EDIT_TOPO_DEFULT_IPS=" EDIT_TOPO_DEFULT_IPS";
export const REMOVE_TOPO_DEFULT_IPS="REMOVE_TOPO_DEFULT_IPS"

export const ADD_TOPO_CONFIG="ADD_TOPO_CONFIG";
export const REMOVE_TOPO_CONFIG="REMOVE_TOPO_CONFIG";
export const EDIT_TOPO_CONFIG_DATA="EDIT_TOPO_CONFIG_DATA";

export const ADD_CONFIG_DEFULT="ADD_CONFIG_DEFULT";
export const REMOVE_CONFIG_DEFULT="REMOVE_CONFIG_DEFULT";
export const EDIT_CONFIG_DEFULT_DATA="EDIT_CONFIG_DEFULT_DATA";

export const ADD_PROVINCE="ADD_PROVINCE";
export const REMOVE_PROVINCE="REMOVE_PROVINCE";
export const ADD_PROVINCE_IP="ADD_PROVINCE_IP";
export const REMOVE_PROVINCE_IP="REMOVE_PROVINCE_IP";
export const EDIT_PROVINCE_IP="EDIT_PROVINCE_IP";*/

//设备
export const ADD_DEV="ADD_DEV";
export const ADD_ISP="ADD_ISP";
export const DEL_ISP="DEL_ISP";
export const EDIT_DEV="EDIT_DEV";
export const EDIT_IPS="EDIT_IPS";
export const SEARCH_DEV="SEARCH_DEV";
//export const ADD_DEV_PAGE="ADD_DEV_PAGE";
export const SHOW_DEV_LIST="SHOW_DEV_LIST";
export const EDIT_SEARCH_DEV="EDIT_SEARCH_DEV";
export const EDIT_DEV_LIST="EDIT_DEV_LIST";
/*export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';


/*
 * action 创建函数
 */
/*export function loginIn(text) {
    return { type: Login, text}
}*/
//设备
export function addDevice(data) {
    return { type: ADD_DEV,data}
}
export function addIsp(data) {
    return { type: ADD_ISP,data}
}
export function delIsp(index) {
    return { type: DEL_ISP,index}
}
export function editDev(data){
    return { type: EDIT_DEV,data}
}
export function editIps(data,index){
    return { type: EDIT_IPS,data,index}
}

export function searchDevice(data){
    return { type: SEARCH_DEV,data}
}
export function editSearchDevice(data){
    return { type: EDIT_SEARCH_DEV,data}
}
/*export function addDevPage(data){
    return { type: ADD_DEV_PAGE,data}
}*/
export function showDeviceList(data){
    return { type: SHOW_DEV_LIST,data}
}
export function editDeviceList(data,index){
    return { type: EDIT_DEV_LIST,data,index}
}
//拓扑结构
/*export function editTopData(data,index){
    return { type: EDIT_TOPO, data,index}
}
export function addTopo(data) {
    return { type: ADD_TOPO,data}
}
export function selectTopo(index) {
    return { type: SELECT_TOPO, index }
}
export function removeTopo(index) {
    return { type: REMOVE_TOPO, index }
}
//拓扑默认Ip
export function addTopoDefultIp(data,index) {
    return { type: ADD_TOPO_DEFULT_IPS,data,index }
}
export function editTopoDefultIp(data,topoIndex,ipIndex) {
    return { type: EDIT_TOPO_DEFULT_IPS,data,topoIndex,ipIndex }
}
export function removeTopoDefultIp(topoIndex,ipIndex) {
    return { type: REMOVE_TOPO_DEFULT_IPS,topoIndex,ipIndex }
}
//省份运营商配置
export function addIpConfig(data,topoIndex) {
    return { type: ADD_TOPO_CONFIG,data,topoIndex }
}
export function removeIpConfig(topoIndex,ipConfigIndex) {
    return { type: REMOVE_TOPO_CONFIG,topoIndex,ipConfigIndex }
}
export function editConfigData(data,topoIndex,ipConfigIndex) {
    return { type: EDIT_TOPO_CONFIG_DATA,data,topoIndex,ipConfigIndex }
}
//config-默认ip
export function addConfigDefultIp(data,topoIndex,ipConfigIndex) {
    return { type: ADD_CONFIG_DEFULT,data,topoIndex,ipConfigIndex }
}
export function removeConfigDefultIp(topoIndex,ipConfigIndex,ipIndex) {
    return { type: REMOVE_CONFIG_DEFULT,topoIndex,ipConfigIndex ,ipIndex}
}
export function editConfigDefultIp(data,topoIndex,ipConfigIndex,ipIndex) {
    return { type: EDIT_CONFIG_DEFULT_DATA,data,topoIndex,ipConfigIndex,ipIndex }
}
//省份
export function addProvince(data,topoIndex,ipConfigIndex) {
    return { type: ADD_PROVINCE,data,topoIndex,ipConfigIndex }
}
export function delProvince(topoIndex,ipConfigIndex,porvIndex) {
    return { type: REMOVE_PROVINCE,topoIndex,ipConfigIndex,porvIndex }
}

export function addProvIp(data,topoIndex,ipConfigIndex,porvIndex) {
    return { type: ADD_PROVINCE_IP,data,topoIndex,ipConfigIndex,porvIndex }
}
export function removeProvIp(topoIndex,ipConfigIndex,porvIndex,ipIndex) {
    return { type: REMOVE_PROVINCE_IP,topoIndex,ipConfigIndex,porvIndex ,ipIndex}
}
export function editProvIp(data,topoIndex,ipConfigIndex,porvIndex,ipIndex) {
    return { type: EDIT_PROVINCE_IP,data,topoIndex,ipConfigIndex,porvIndex,ipIndex }
}*/
/*
export function completeTodo(index) {
    return { type: COMPLETE_TODO, index }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}*/
