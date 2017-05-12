import { PROXY_CLEAR_DATA,PROXY_ADD_ISP,PROXY_EDIT_ISP,PROXY_DEL_ISP,PROXY_DEL_PROV,PROXY_ADD_PROV,PROXY_EDIT_PROV,PROXY_EDIT_PROV_IP,PROXY_ADD_PROV_IP,PROXY_DEL_PROV_IP,
    PROXY_CLEAR_ISP,PROXY_CLEAR_PROV_IP} from '../actions/proxyActions.js'
export default function proxyDev(state = [], action) {
    switch (action.type) {
        case PROXY_CLEAR_DATA:
            return [];
        case PROXY_ADD_ISP:
            var _data=action.data;
            return [...state,..._data];
        case PROXY_EDIT_ISP:
            var _data=action.data,thisState=state[action.index];
            return [
                ...state.slice(0,action.index),
                {...thisState,..._data},
                ...state.slice(action.index+1)
            ]
        case PROXY_CLEAR_ISP:
            var thisState=state[action.index];
            thisState.isp="";
            for(var i=0;i<thisState.provinces.length;i++){
                thisState.provinces[i].province="";
                var ips=thisState.provinces[i].Ipinfo;
                for(var j=0;j<ips.length;j++){
                    ips[j].ip="";
                }
                thisState.provinces[i].Ipinfo=[...ips];
            }
            return [
                ...state.slice(0,action.index),
                {...thisState},
                ...state.slice(action.index+1)
            ]
        case PROXY_DEL_ISP:
            return [
                ...state.slice(0,action.index),
                ...state.slice(action.index+1)
            ]
        case PROXY_ADD_PROV:
            var _data=action.data,thisState=state[action.index],provinces=thisState.provinces;
            provinces=[...provinces,_data];
            state[action.index].provinces=provinces;
            return [...state]
        case PROXY_EDIT_PROV:
            var _data=action.data,thisState=state[action.index],provinces=thisState.provinces,_thisProv=provinces[action.provIndex];
            provinces=[...provinces.slice(0,action.provIndex),
                {..._thisProv,..._data},
                ...provinces.slice(action.provIndex+1)];
            state[action.index].provinces=provinces;
            return [...state]
        case PROXY_DEL_PROV:
            var thisState=state[action.index],provinces=thisState.provinces,_thisProv=provinces[action.provIndex];
            provinces=[...provinces.slice(0,action.provIndex),
                ...provinces.slice(action.provIndex+1)];
            state[action.index].provinces=provinces;
            return [...state]

        case PROXY_ADD_PROV_IP:
            var _data=action.data,thisState=state[action.index],provinces=thisState.provinces,_thisProv=provinces[action.provIndex],
                ips=_thisProv.Ipinfo;
            ips=[...ips,_data];
            state[action.index].provinces[action.provIndex].Ipinfo=ips;
            return [...state]
        case PROXY_EDIT_PROV_IP:
            var _data=action.data,thisState=state[action.index],provinces=thisState.provinces,_thisProv=provinces[action.provIndex],
                ips=_thisProv.Ipinfo,_thisIpData=ips[action.ipIndex];
            ips=[...ips.slice(0,action.ipIndex),
                {..._thisIpData,..._data},
                ...ips.slice(action.ipIndex+1)];
            state[action.index].provinces[action.provIndex].Ipinfo=ips;
            return [...state]
        case PROXY_DEL_PROV_IP:
            var thisState=state[action.index],provinces=thisState.provinces,_thisProv=provinces[action.provIndex],
                ips=_thisProv.Ipinfo;
            ips=[...ips.slice(0,action.ipIndex),
                ...ips.slice(action.ipIndex+1)];
            state[action.index].provinces[action.provIndex].Ipinfo=ips;
            return [...state]
        case PROXY_CLEAR_PROV_IP:
            var thisState=state[action.index],provinces=thisState.provinces,_thisProv=provinces[action.provIndex],
                ips=_thisProv.Ipinfo;
            for(var i=0;i<ips.length;i++){
                ips[i].ip="";
            }
            state[action.index].provinces[action.provIndex].Ipinfo=ips;
            return [...state]
        default:
            return state
    }
}