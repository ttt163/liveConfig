//配置
export const ADD_CONFIG_DATA="ADD_CONFIG_DATA";
export const EDIT_CONFIG_DATA="EDIT_CONFIG_DATA";
export const CLEAR_CONFIG_DATA="CLEAR_CONFIG_DATA";
//export const ADD_DEV="ADD_DEV";
export const EDIT_IP_CONFIG_DATA="EDIT_IP_CONFIG_DATA";
export const ADD_IP_CONFIG_DATA="ADD_IP_CONFIG_DATA";
export const DEL_IP_CONFIG_DATA="DEL_IP_CONFIG_DATA";
//运营商
export const ADD_OPR_CONFIG_DATA="ADD_OPR_CONFIG_DATA";
export const DEL_OPR_CONFIG_DATA="DEL_OPR_CONFIG_DATA";
export const EDIT_OPR_CONFIG_DATA="EDIT_OPR_CONFIG_DATA";

export const EDIT_OPR_IP_CONFIG_DATA="EDIT_OPR_IP_CONFIG_DATA";
export const ADD_OPR_IP_CONFIG_DATA="ADD_OPR_IP_CONFIG_DATA";
export const DEL_OPR_IP_CONFIG_DATA="DEL_OPR_IP_CONFIG_DATA";
//省份
export const ADD_PRO_CONFIG_DATA="ADD_PRO_CONFIG_DATA";
export const DEL_PRO_CONFIG_DATA="DEL_PRO_CONFIG_DATA";
export const EDIT_PRO_CONFIG_DATA="EDIT_PRO_CONFIG_DATA";

export const EDIT_PRO_IP_CONFIG_DATA="EDIT_PRO_IP_CONFIG_DATA";
export const ADD_PRO_IP_CONFIG_DATA="ADD_PRO_IP_CONFIG_DATA";
export const DEL_PRO_IP_CONFIG_DATA="DEL_PRO_IP_CONFIG_DATA";
//频道
export const ADD_CONFIG_CHANNEL_DATA="ADD_CONFIG_CHANNEL_DATA";
export const DEL_CHANNEL_DATA="DEL_CHANNEL_DATA";
export const ADD_CHANNEL_DATA="ADD_CHANNEL_DATA";
export const EDIT_CHANNEL_DATA="EDIT_CHANNEL_DATA";
export const CHANGE_CONFIG_LEVEL="CHANGE_CONFIG_LEVEL";

//回源
export const ADD_CONFIG_ORIGIN_DATA="ADD_CONFIG_ORIGIN_DATA";
export const DEL_ORIGIN_DATA="DEL_ORIGIN_DATA";
export const ADD_ORIGIN_DATA="ADD_ORIGIN_DATA";
export const EDIT_ORIGIN_DATA="EDIT_ORIGIN_DATA";
export const CHANGE_ORIGIN_CONFIG_LEVEL="CHANGE_ORIGIN_CONFIG_LEVEL";
//http服务
export const ADD_CONFIG_HTTPSERVICE_DATA="ADD_CONFIG_HTTPSERVICE_DATA";
export const DEL_HTTPSERVICE_DATA="DEL_HTTPSERVICE_DATA";
export const ADD_HTTPSERVICE_DATA="ADD_HTTPSERVICE_DATA";
export const EDIT_HTTPSERVICE_DATA="EDIT_HTTPSERVICE_DATA";
export const CHANGE_HTTPSERVICE_CONFIG_LEVEL="CHANGE_HTTPSERVICE_CONFIG_LEVEL";

//flv文件录制
export const ADD_CONFIG_FLV_DATA="ADD_CONFIG_FLV_DATA";
export const DEL_FLV_DATA="DEL_FLV_DATA";
export const ADD_FLV_DATA="ADD_FLV_DATA";
export const EDIT_FLV_DATA="EDIT_FLV_DATA";
export const CHANGE_FLV_CONFIG_LEVEL="CHANGE_FLV_CONFIG_LEVEL";
//hls
export const ADD_CONFIG_HLS_DATA="ADD_CONFIG_HLS_DATA";
export const DEL_HLS_DATA="DEL_HLS_DATA";
export const ADD_HLS_DATA="ADD_HLS_DATA";
export const EDIT_HLS_DATA="EDIT_HLS_DATA";
export const CHANGE_HLS_CONFIG_LEVEL="CHANGE_HLS_CONFIG_LEVEL";
//http+ts
export const ADD_CONFIG_HTTPTS_DATA="ADD_CONFIG_HTTPTS_DATA";
export const DEL_HTTPTS_DATA="DEL_HTTPTS_DATA";
export const ADD_HTTPTS_DATA="ADD_HTTPTS_DATA";
export const EDIT_HTTPTS_DATA="EDIT_HTTPTS_DATA";
export const CHANGE_HTTPTS_CONFIG_LEVEL="CHANGE_HTTPTS_CONFIG_LEVEL";
//Mp4
export const ADD_CONFIG_MP4_DATA="ADD_CONFIG_MP4_DATA";
export const DEL_MP4_DATA="DEL_MP4_DATA";
export const ADD_MP4_DATA="ADD_MP4_DATA";
export const EDIT_MP4_DATA="EDIT_MP4_DATA";
export const CHANGE_MP4_CONFIG_LEVEL="CHANGE_MP4_CONFIG_LEVEL";
//print
export const ADD_CONFIG_PRINT_DATA="ADD_CONFIG_PRINT_DATA";
export const DEL_PRINT_DATA="DEL_PRINT_DATA";
export const ADD_PRINT_DATA="ADD_PRINT_DATA";
export const EDIT_PRINT_DATA="EDIT_PRINT_DATA";
export const CHANGE_PRINT_CONFIG_LEVEL="CHANGE_PRINT_CONFIG_LEVEL";
//ip_list
export const ADD_CONFIG_IPLIST_DATA="ADD_CONFIG_IPLIST_DATA";
export const DEL_IPLIST_DATA="DEL_IPLIST_DATA";
export const ADD_IPLIST_DATA="ADD_IPLIST_DATA";
export const EDIT_IPLIST_DATA="EDIT_IPLIST_DATA";
export const CHANGE_IPLIST_CONFIG_LEVEL="CHANGE_IPLIST_CONFIG_LEVEL";
//refer
export const ADD_CONFIG_REFER_DATA="ADD_CONFIG_REFER_DATA";
export const DEL_REFER_DATA="DEL_REFER_DATA";
export const ADD_REFER_DATA="ADD_REFER_DATA";
export const EDIT_REFER_DATA="EDIT_REFER_DATA";
export const CHANGE_REFER_CONFIG_LEVEL="CHANGE_REFER_CONFIG_LEVEL";
//HOOK
export const ADD_CONFIG_HTTPHOOK_DATA="ADD_CONFIG_HTTPHOOK_DATA";
export const DEL_HTTPHOOK_DATA="DEL_HTTPHOOK_DATA";
export const ADD_HTTPHOOK_DATA="ADD_HTTPHOOK_DATA";
export const EDIT_HTTPHOOK_DATA="EDIT_HTTPHOOK_DATA";
export const EDIT_HTTPHOOK="EDIT_HTTPHOOK";
export const CHANGE_HTTPHOOK_CONFIG_LEVEL="CHANGE_HTTPHOOK_CONFIG_LEVEL";

export const DEL_HOOK_DATA="DEL_HOOK_DATA";
export const ADD_HOOK_DATA="ADD_HOOK_DATA";
export const EDIT_HOOK_DATA="EDIT_HOOK_DATA";

export const ADD_HOOK_EVENT_DATA="ADD_HOOK_EVENT_DATA";
/*
 * action 创建函数
 */

//配置
export function addConfigData(data) {
    return { type: ADD_CONFIG_DATA,data}
}
export function clearConfigData() {
    return { type: CLEAR_CONFIG_DATA}
}
export function editConfigData(data,ctype) {
    return { type: EDIT_CONFIG_DATA,data,ctype}
}
//默认ip
export function editIpConfigData(data,index,ctype) {
    return { type: EDIT_IP_CONFIG_DATA,data,index,ctype}
}
export function addIpConfigData(data,ctype) {
    return { type: ADD_IP_CONFIG_DATA,data,ctype}
}
export function delIpConfigData(index,ctype) {
    return { type: DEL_IP_CONFIG_DATA,index,ctype}
}
//运营商
export function addOperatConfigData(data,ctype){
    return { type: ADD_OPR_CONFIG_DATA,data,ctype}
}
export function delOperatConfigData(index,ctype){
    return { type: DEL_OPR_CONFIG_DATA,index,ctype}
}
export function editOperatConfigData(data,index,ctype){
    return { type: EDIT_OPR_CONFIG_DATA,data,index,ctype}
}
//运营商 默认ip
export function editOprIpConfigData(data,index,configIndex,ctype) {
    return { type: EDIT_OPR_IP_CONFIG_DATA,data,index,configIndex,ctype}
}
export function addIpOprConfigData(data,configIndex,ctype) {
    return { type: ADD_OPR_IP_CONFIG_DATA,data,configIndex,ctype}
}
export function delIpOprConfigData(index,configIndex,ctype) {
    return { type: DEL_OPR_IP_CONFIG_DATA,index,configIndex,ctype}
}
//省份
export function addConfigProvince(data,configIndex,ctype){
    return { type: ADD_PRO_CONFIG_DATA,data,configIndex,ctype}
}
export function delConfigProvince(porvIndex,configIndex,ctype){
    return { type: DEL_PRO_CONFIG_DATA,porvIndex,configIndex,ctype}
}
export function editConfigProvince(data,porvIndex,configIndex,ctype){
    return { type: EDIT_PRO_CONFIG_DATA,data,porvIndex,configIndex,ctype}
}
//省份 默认ip
export function editConfigProvIp(data,index,porvIndex,configIndex,ctype) {
    return { type: EDIT_PRO_IP_CONFIG_DATA,data,index,porvIndex,configIndex,ctype}
}
export function addConfigProvIp(data,porvIndex,configIndex,ctype) {
    return { type: ADD_PRO_IP_CONFIG_DATA,data,porvIndex,configIndex,ctype}
}
export function delConfigProvIp(index,porvIndex,configIndex,ctype) {
    return { type: DEL_PRO_IP_CONFIG_DATA,index,porvIndex,configIndex,ctype}
}

//频道
export function addConfigChannData(data,ctype) {
    return { type: ADD_CONFIG_CHANNEL_DATA,data,ctype}
}
export function delChannelData(index,ctype) {
    return { type: DEL_CHANNEL_DATA,index,ctype}
}
export function addChannelData(data,ctype) {
    return { type: ADD_CHANNEL_DATA,data,ctype}
}
export function editChannel(data,index,ctype) {
    return { type: EDIT_CHANNEL_DATA,data,index,ctype}
}
//生效层级
export function changeLevel(val,isCheck,index,ctype){
    return { type: CHANGE_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//HTTP服务器

export function addConfigHttpServiceData(data,ctype) {
    return { type: ADD_CONFIG_HTTPSERVICE_DATA,data,ctype}
}
export function delHttpServiceData(index,ctype) {
    return { type: DEL_HTTPSERVICE_DATA,index,ctype}
}
export function addHttpServiceData(data,ctype) {
    return { type: ADD_HTTPSERVICE_DATA,data,ctype}
}
export function editHttpService(data,index,ctype) {
    return { type: EDIT_HTTPSERVICE_DATA,data,index,ctype}
}
//生效层级
export function changeHttpServiceevel(val,isCheck,index,ctype){
    return { type: CHANGE_HTTPSERVICE_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//回源
export function addConfigOriginData(data,ctype) {
    return { type: ADD_CONFIG_ORIGIN_DATA,data,ctype}
}
export function delOriginData(index,ctype) {
    return { type: DEL_ORIGIN_DATA,index,ctype}
}
export function addOriginData(data,ctype) {
    return { type: ADD_ORIGIN_DATA,data,ctype}
}
export function editOrigin(data,index,ctype) {
    return { type: EDIT_ORIGIN_DATA,data,index,ctype}
}
//生效层级
export function changeOriginLevel(val,isCheck,index,ctype){
    return { type: CHANGE_ORIGIN_CONFIG_LEVEL,val,isCheck,index,ctype}
}

//文件录制
export function addConfigFlvData(data,ctype) {
    return { type: ADD_CONFIG_FLV_DATA,data,ctype}
}
export function delFlvData(index,ctype) {
    return { type: DEL_FLV_DATA,index,ctype}
}
export function addFlvData(data,ctype) {
    return { type: ADD_FLV_DATA,data,ctype}
}
export function editFlv(data,index,ctype) {
    return { type: EDIT_FLV_DATA,data,index,ctype}
}
//生效层级
export function changeFlvLevel(val,isCheck,index,ctype){
    return { type: CHANGE_FLV_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//hls服务
export function addConfigHlsData(data,ctype) {
    return { type: ADD_CONFIG_HLS_DATA,data,ctype}
}
export function delHlsData(index,ctype) {
    return { type: DEL_HLS_DATA,index,ctype}
}
export function addHlsData(data,ctype) {
    return { type: ADD_HLS_DATA,data,ctype}
}
export function editHls(data,index,ctype) {
    return { type: EDIT_HLS_DATA,data,index,ctype}
}
//生效层级
export function changeHlsLevel(val,isCheck,index,ctype){
    return { type: CHANGE_HLS_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//HTTP+TS
export function addConfigHttpTsData(data,ctype) {
    return { type: ADD_CONFIG_HTTPTS_DATA,data,ctype}
}
export function delHttpTsData(index,ctype) {
    return { type: DEL_HTTPTS_DATA,index,ctype}
}
export function addHttpTsData(data,ctype) {
    return { type: ADD_HTTPTS_DATA,data,ctype}
}
export function editHttpTs(data,index,ctype) {
    return { type: EDIT_HTTPTS_DATA,data,index,ctype}
}
//生效层级
export function changeHttpTsLevel(val,isCheck,index,ctype){
    return { type: CHANGE_HTTPTS_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//mp4
export function addConfigMp4Data(data,ctype) {
    return { type: ADD_CONFIG_MP4_DATA,data,ctype}
}
export function delMp4Data(index,ctype) {
    return { type: DEL_MP4_DATA,index,ctype}
}
export function addMp4Data(data,ctype) {
    return { type: ADD_MP4_DATA,data,ctype}
}
export function editMp4(data,index,ctype) {
    return { type: EDIT_MP4_DATA,data,index,ctype}
}
//生效层级
export function changeMp4Level(val,isCheck,index,ctype){
    return { type: CHANGE_MP4_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//print
export function addConfigPrintData(data,ctype) {
    return { type: ADD_CONFIG_PRINT_DATA,data,ctype}
}
export function delPrintData(index,ctype) {
    return { type: DEL_PRINT_DATA,index,ctype}
}
export function addPrintData(data,ctype) {
    return { type: ADD_PRINT_DATA,data,ctype}
}
export function editPrint(data,index,ctype) {
    return { type: EDIT_PRINT_DATA,data,index,ctype}
}
//生效层级
export function changePrintLevel(val,isCheck,index,ctype){
    return { type: CHANGE_PRINT_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//ip_list
export function addConfigIpListData(data,ctype) {
    return { type: ADD_CONFIG_IPLIST_DATA,data,ctype}
}
export function delIpListData(index,ctype) {
    return { type: DEL_IPLIST_DATA,index,ctype}
}
export function addIpListData(data,ctype) {
    return { type: ADD_IPLIST_DATA,data,ctype}
}
export function editIpList(data,index,ctype) {
    return { type: EDIT_IPLIST_DATA,data,index,ctype}
}
//生效层级
export function changeIpListLevel(val,isCheck,index,ctype){
    return { type: CHANGE_IPLIST_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//refer
export function addConfigReferData(data,ctype) {
    return { type: ADD_CONFIG_REFER_DATA,data,ctype}
}
export function delReferData(index,ctype) {
    return { type: DEL_REFER_DATA,index,ctype}
}
export function addReferData(data,ctype) {
    return { type: ADD_REFER_DATA,data,ctype}
}
export function editRefer(data,index,ctype) {
    return { type: EDIT_REFER_DATA,data,index,ctype}
}
//生效层级
export function changeReferLevel(val,isCheck,index,ctype){
    return { type: CHANGE_REFER_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//http_hook
export function addConfigHttpHookData(data,ctype) {
    return { type: ADD_CONFIG_HTTPHOOK_DATA,data,ctype}
}
export function delHttpHookData(index,ctype) {
    return { type: DEL_HTTPHOOK_DATA,index,ctype}
}
export function addHttpHookData(data,ctype) {
    return { type: ADD_HTTPHOOK_DATA,data,ctype}
}
export function editHttpHookData(data,index,ctype) {
    return { type: EDIT_HTTPHOOK,data,index,ctype}
}
export function editHttpHook(data,index,ctype) {
    return { type: EDIT_HTTPHOOK_DATA,data,index,ctype}
}
//生效层级
export function changeHttpHookLevel(val,isCheck,index,ctype){
    return { type: CHANGE_HTTPHOOK_CONFIG_LEVEL,val,isCheck,index,ctype}
}
//删除hook
export function delHook(hookIndex,currHook,index,ctype){
    return { type: DEL_HOOK_DATA,hookIndex,currHook,index,ctype}
}
//新增hook
export function addHook(data,currHook,index,ctype){
    return { type: ADD_HOOK_DATA,data,currHook,index,ctype}
}
export function editHook(data,hookIndex,currHook,index,ctype){
    return { type: EDIT_HOOK_DATA,data,hookIndex,currHook,index,ctype}
}
//hook-event
export function editHookEvent(data,currHook,index,ctype){
    return { type: ADD_HOOK_EVENT_DATA,data,currHook,index,ctype}
}

