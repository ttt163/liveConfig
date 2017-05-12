import { ADD_CONFIG_DATA,CLEAR_CONFIG_DATA,EDIT_CONFIG_DATA,EDIT_IP_CONFIG_DATA,ADD_IP_CONFIG_DATA,DEL_IP_CONFIG_DATA,
    ADD_OPR_CONFIG_DATA,DEL_OPR_CONFIG_DATA,EDIT_OPR_CONFIG_DATA,EDIT_OPR_IP_CONFIG_DATA,ADD_OPR_IP_CONFIG_DATA,DEL_OPR_IP_CONFIG_DATA,
    ADD_PRO_CONFIG_DATA,DEL_PRO_CONFIG_DATA,EDIT_PRO_CONFIG_DATA,EDIT_PRO_IP_CONFIG_DATA,ADD_PRO_IP_CONFIG_DATA,DEL_PRO_IP_CONFIG_DATA
    } from '../actions/clmsConfigActions.js'
export default function clmsConfig(state = [], action) {
    switch (action.type) {
        case ADD_CONFIG_DATA:
            var data=action.data;
            return {...state,...data}
        case CLEAR_CONFIG_DATA:
            state={};
            return {...state}
        case EDIT_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype];
            state[action.ctype]={..._thisConfig,...data}
            return {...state}
        case DEL_IP_CONFIG_DATA:
            var _thisConfig=state[action.ctype],_ipInfo=_thisConfig.topology_info,defaultData=_ipInfo.default.Ipinfo;
            state[action.ctype].topology_info.default.Ipinfo=[
                ...defaultData.slice(0,action.index),
                ...defaultData.slice(action.index+1)
            ]
            return {...state}
        case ADD_IP_CONFIG_DATA:
            var _thisConfig=state[action.ctype],_ipInfo=_thisConfig.topology_info,defaultData=_ipInfo.default.Ipinfo;
            defaultData.push(action.data);
            state[action.ctype].topology_info.default.Ipinfo=defaultData;
            return {...state}
        case EDIT_IP_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],_ipInfo=_thisConfig.topology_info,defaultData=_ipInfo.default.Ipinfo,_thisIpData=defaultData[action.index];

            state[action.ctype].topology_info.default.Ipinfo=[
                ...defaultData.slice(0,action.index),
                {..._thisIpData,...data},
                ...defaultData.slice(action.index+1)
            ]
            return {...state}
        //运营商
        case ADD_OPR_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig;
            ipConfig.push(data);
            state[action.ctype].topology_info.ipConfig=ipConfig;
            return {...state}
        case DEL_OPR_CONFIG_DATA:
            var _thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig;
            state[action.ctype].topology_info.ipConfig=[
                ...ipConfig.slice(0,action.index),
                ...ipConfig.slice(action.index+1)
            ]
            return {...state}
        case EDIT_OPR_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.index];
            state[action.ctype].topology_info.ipConfig=[
                ...ipConfig.slice(0,action.index),
                {..._thisIpConfig,...data},
                ...ipConfig.slice(action.index+1)
            ]
            return {...state}
        //运营商默认ip
        case EDIT_OPR_IP_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.configIndex],
                defaultIp=_thisIpConfig.default,_thisDefaultIp=defaultIp[action.index];
            state[action.ctype].topology_info.ipConfig[action.configIndex].default=[
                ...defaultIp.slice(0,action.index),
                {..._thisDefaultIp,...data},
                ...defaultIp.slice(action.index+1)
            ]
            return {...state}
        case ADD_OPR_IP_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.configIndex],
                defaultIp=_thisIpConfig.default;
            defaultIp.push(data);
            state[action.ctype].topology_info.ipConfig[action.configIndex].default=defaultIp;
            return {...state}
        case DEL_OPR_IP_CONFIG_DATA:
            var _thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.configIndex],
                defaultIp=_thisIpConfig.default;
            state[action.ctype].topology_info.ipConfig[action.configIndex].default=[
                ...defaultIp.slice(0,action.index),
                ...defaultIp.slice(action.index+1)
            ]
            return {...state}
        //省份
        case ADD_PRO_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.configIndex],
                provs=_thisIpConfig.provinces;
            provs.push(data);
            state[action.ctype].topology_info.ipConfig[action.configIndex].provinces=provs;
            return {...state}
        case DEL_PRO_CONFIG_DATA:
            var _thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.configIndex],
                provs=_thisIpConfig.provinces;
            state[action.ctype].topology_info.ipConfig[action.configIndex].provinces=[
                ...provs.slice(0,action.porvIndex),
                ...provs.slice(action.porvIndex+1)
            ]
            return {...state}
        case EDIT_PRO_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.configIndex],
                provs=_thisIpConfig.provinces,_thisProv=provs[action.porvIndex];
            state[action.ctype].topology_info.ipConfig[action.configIndex].provinces=[
                ...provs.slice(0,action.porvIndex),
                {..._thisProv,...data},
                ...provs.slice(action.porvIndex+1)
            ];
            return {...state}
        //省份 默认ip
        case EDIT_PRO_IP_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.configIndex],
                provs=_thisIpConfig.provinces,_thisProv=provs[action.porvIndex],defaultIp=_thisProv.Ipinfo,_thisDefaultIp=defaultIp[action.index];
            state[action.ctype].topology_info.ipConfig[action.configIndex].provinces[action.porvIndex].Ipinfo=[
                ...defaultIp.slice(0,action.index),
                {..._thisDefaultIp,...data},
                ...defaultIp.slice(action.index+1)
            ]
            return {...state}
        case ADD_PRO_IP_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.configIndex],
                provs=_thisIpConfig.provinces,_thisProv=provs[action.porvIndex],defaultIp=_thisProv.Ipinfo;
            defaultIp.push(data);
            state[action.ctype].topology_info.ipConfig[action.configIndex].provinces[action.porvIndex].Ipinfo=defaultIp;
            return {...state}
        case DEL_PRO_IP_CONFIG_DATA:
            var data=action.data,_thisConfig=state[action.ctype],ipConfig=_thisConfig.topology_info.ipConfig,_thisIpConfig=ipConfig[action.configIndex],
                provs=_thisIpConfig.provinces,_thisProv=provs[action.porvIndex],defaultIp=_thisProv.Ipinfo;
            state[action.ctype].topology_info.ipConfig[action.configIndex].provinces[action.porvIndex].Ipinfo=[
                ...defaultIp.slice(0,action.index),
                ...defaultIp.slice(action.index+1)
            ]
            return {...state}
        default:
            return state
    }
}