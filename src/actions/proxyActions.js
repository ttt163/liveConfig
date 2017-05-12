//代理设备
export const PROXY_CLEAR_DATA="PROXY_CLEAR_DATA";
export const PROXY_ADD_ISP="PROXY_ADD_ISP";
export const PROXY_EDIT_ISP="PROXY_EDIT_ISP";
export const PROXY_DEL_ISP="PROXY_DEL_ISP";

export const PROXY_EDIT_PROV="PROXY_EDIT_PROV";
export const PROXY_ADD_PROV="PROXY_ADD_PROV";
export const PROXY_DEL_PROV="PROXY_DEL_PROV";

export const PROXY_EDIT_PROV_IP="PROXY_EDIT_PROV_IP";
export const PROXY_ADD_PROV_IP="PROXY_ADD_PROV_IP";
export const PROXY_DEL_PROV_IP="PROXY_DEL_PROV_IP";

export const PROXY_CLEAR_ISP="PROXY_CLEAR_ISP";
export const PROXY_CLEAR_PROV_IP="PROXY_CLEAR_PROV_IP";

/*
 * action 创建函数
 */

//代理设备
export function addIpconfig(data) {
    return { type: PROXY_ADD_ISP,data}
}
export function clearProxyData() {
    return { type: PROXY_CLEAR_DATA}
}
export function editIspData(data,index) {
    return { type: PROXY_EDIT_ISP,data,index}
}
export function delIsp(index) {
    return { type: PROXY_DEL_ISP,index}
}

export function editProvData(data,provIndex,index) {
    return { type: PROXY_EDIT_PROV,data,provIndex,index}
}
export function addProv(data,index) {
    return { type: PROXY_ADD_PROV,data,index}
}
export function delProv(provIndex,index) {
    return { type: PROXY_DEL_PROV,provIndex,index}
}

export function editProvIp(data,ipIndex,provIndex,index) {
    return { type: PROXY_EDIT_PROV_IP,data,ipIndex,provIndex,index}
}
export function addProvIp(data,provIndex,index) {
    return { type: PROXY_ADD_PROV_IP,data,provIndex,index}
}
export function delProvIp(ipIndex,provIndex,index) {
    return { type: PROXY_DEL_PROV_IP,ipIndex,provIndex,index}
}
//清空
export function clearIspData(index) {
    return { type: PROXY_CLEAR_ISP,index}
}
//清空ip
export function clearProvIp(provIndex,index) {
    return { type: PROXY_CLEAR_PROV_IP,provIndex,index}
}