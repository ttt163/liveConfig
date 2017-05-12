/**
 * Created by Administrator on 2016/9/28.
 */
import { combineReducers } from 'redux'
import topos from "./topoReducers.js"
import devices from "./deviceReducers.js"
import devicesList  from "./deviceListReducers.js"
import devicesGroup  from "./deviceGroupReducers.js"
import devGroupList  from "./devGroupListReducers.js"
import ListBox  from "./listBoxReducers.js"
import cluster  from "./clusterReducers.js"
import clusterList  from "./clusterListReducers.js"
import clmsTaskList  from "./clmsListReducers.js"
import clmsChannel  from "./clmsReducers.js"
import clmsTask from "./clmsTaskReducers.js"
import clmsConfig from "./clmsConfigReducers.js"
import clmsChannelConfig from "./clmsConfigChannelReducers.js"
import clmsOriginConfig from "./clmsConfigOriginReducers.js"
import clmsHttpServiceConfig from "./clmsConfigHttpServiceReducers.js"
import clmsFlvConfig from "./clmsConfigFlvReducers.js"
import clmsHlsConfig from "./clmsConfighLSReducers.js"
import clmsHttpTsConfig from "./clmsConfigHttpTsReducers.js"
import clmsMp4Config from "./clmsConfigMp4Reducers.js"
import clmsIpListConfig from "./clmsConfigIpListReducers.js"
import clmsPrintConfig from "./clmsConfigPrintReducers.js"
import clmsReferConfig from "./clmsConfigReferReducers.js"
import clmsHookConfig from "./clmsConfigHookReducers.js"
import validator_1  from "../public/js/validate/reducers.js"
import proxyDev from "./proxyReducers.js"
const rootReducer = combineReducers({
        topos,
        devices,
        proxyDev,
        devicesGroup,
        devGroupList,
        devicesList,
        ListBox,
        cluster,
        clusterList,
            clmsTaskList,
            clmsChannel,
        clmsTask,
        clmsConfig,
        clmsChannelConfig,
        clmsOriginConfig,
            clmsHttpServiceConfig,
        clmsFlvConfig,
        clmsHlsConfig,
        clmsHttpTsConfig,
        clmsMp4Config,
            clmsIpListConfig,
            clmsPrintConfig,
            clmsReferConfig,
        clmsHookConfig,
        validator_1
    }
)
export default rootReducer

