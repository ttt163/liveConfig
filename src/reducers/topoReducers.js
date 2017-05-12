/**
 * Created by Administrator on 2016/9/28.
 */
import {SHOW_TOPO,CLEAR_TOPO_DATA, ADD_TOPO,SELECT_TOPO,REMOVE_TOPO,EDIT_TOPO,ADD_TOPO_DEFULT_IPS,EDIT_TOPO_DEFULT_IPS,REMOVE_TOPO_DEFULT_IPS,ADD_TOPO_CONFIG,REMOVE_TOPO_CONFIG,EDIT_TOPO_CONFIG_DATA,ADD_CONFIG_DEFULT,REMOVE_CONFIG_DEFULT,EDIT_CONFIG_DEFULT_DATA,ADD_PROVINCE,EDIT_PROVINCE,REMOVE_PROVINCE,ADD_PROVINCE_IP,REMOVE_PROVINCE_IP,EDIT_PROVINCE_IP} from '../actions/devGoupActions'
export default function topos(state = {currIndex:0,topoItems:[]}, action) {
    switch (action.type) {
        case SHOW_TOPO:
            state.topoItems=action.data;
            return {...state}
        case ADD_TOPO:
            return {...state,topoItems:[...state.topoItems,action.data]}
        case SELECT_TOPO:
            return {...state,currIndex:action.index}
        case CLEAR_TOPO_DATA:
            var topoItems=state.topoItems,thisTopoItem=topoItems[action.index],topoInfo=thisTopoItem.topology_info,tDef=topoInfo.default.Ipinfo,
                iConfig=topoInfo.ipConfig;
            for(var i=0;i<tDef.length;i++){
                tDef[i].ip="";
                tDef[i].type="";
            }
            for(var i=0;i<iConfig.length;i++){
                iConfig[i].operators="";
                for(var j=0;j<iConfig[i].default.length;j++){
                    iConfig[i].default[j].ip="";
                    iConfig[i].default[j].type="";
                }
                for(var j=0;j<iConfig[i].provinces.length;j++){
                    iConfig[i].provinces[j].province="";
                    for(var k=0;k<iConfig[i].provinces[j].Ipinfo.length;k++){
                        iConfig[i].provinces[j].Ipinfo[k].ip="";
                        iConfig[i].provinces[j].Ipinfo[k].type="";
                    }
                }
            }

            //thisTopoItem.default.Ipinfo=tDef;
            thisTopoItem={...thisTopoItem,"name":"","topoRemarks":"","topology_info":topoInfo};
            //console.log(thisTopoItem);
            return {...state,topoItems: topoItems=[
                ...topoItems.slice(0, action.index),
                thisTopoItem,
                ...topoItems.slice(action.index + 1)
            ]}
        case EDIT_TOPO:
            //console.log(action.data);
            var topoItems=state.topoItems[action.index],_data=action.data;
            state.topoItems[action.index]={...topoItems,..._data};
            //console.log(topoItems);
           /* for(var i=0;i<state.topoItems.length;i++){
                if(i==action.index){
                    var topoItems=state.topoItems[i];
                    for(var [k,v] of Object.entries(state.topoItems[i])){
                        if(k==action.data.key){
                            state.topoItems[i]={...topoItems,[k]:action.data.value};
                            break;
                        }

                    }
                }

            }*/
            return {...state}
        case REMOVE_TOPO:
            var topoItems=state.topoItems;
            for(var i=0;i<topoItems.length;i++){
                if(i==action.index){
                    topoItems=[
                        ...topoItems.slice(0, i),
                        ...topoItems.slice(i + 1)
                    ]
                    break;
                }
            }
            return action.index!=state.currIndex? {...state,topoItems:topoItems}:{...state,currIndex:0,topoItems:topoItems};
        //拓扑默认ip
        case ADD_TOPO_DEFULT_IPS:
            var  thisTopoItems=state.topoItems[action.index],thisDef=thisTopoItems.topology_info.default;
            thisDef.Ipinfo=[...thisDef.Ipinfo,action.data];
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.index),
                thisTopoItems,
                ...state.topoItems.slice(action.index + 1)
            ]}
        case EDIT_TOPO_DEFULT_IPS:
            var  thisTopoItems=state.topoItems[action.topoIndex],thisDef=thisTopoItems.topology_info.default,thisIpInfo=thisDef.Ipinfo[action.ipIndex];
            var _data=action.data;
           // thisIpInfo={...thisIpInfo,..._data};
            thisTopoItems.topology_info.default.Ipinfo[action.ipIndex]={...thisIpInfo,..._data};
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        case REMOVE_TOPO_DEFULT_IPS:
            var  thisTopoItems=state.topoItems[action.topoIndex],thisDef=thisTopoItems.topology_info.default;
            thisTopoItems.topology_info.default.Ipinfo=[...thisDef.Ipinfo.slice(0, action.ipIndex),...thisDef.Ipinfo.slice(action.ipIndex+1)];
            //console.log(thisTopoItems.topology_info.default.Ipinfo);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        //省份-运营商配置
        case ADD_TOPO_CONFIG:
            var  thisTopoItems=state.topoItems[action.topoIndex],ipConfigs=thisTopoItems.topology_info.ipConfig;
            thisTopoItems.topology_info.ipConfig=[...ipConfigs,action.data];
            //thisTopoItems.topology_info.default.Ipinfo=[...thisDef.Ipinfo.slice(0, action.ipIndex),...thisDef.Ipinfo.slice(action.ipIndex+1)];
            console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        case REMOVE_TOPO_CONFIG:
            var  thisTopoItems=state.topoItems[action.topoIndex],ipConfigs=thisTopoItems.topology_info.ipConfig;
            thisTopoItems.topology_info.ipConfig=[...ipConfigs.slice(0, action.ipConfigIndex),...ipConfigs.slice(action.ipConfigIndex+1)];
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        case EDIT_TOPO_CONFIG_DATA:
            var  thisTopoItems=state.topoItems[action.topoIndex],ipConfigs=thisTopoItems.topology_info.ipConfig,thisIpConfing=ipConfigs[action.ipConfigIndex];
            var _data=action.data;
            thisTopoItems.topology_info.ipConfig=[...ipConfigs.slice(0, action.ipConfigIndex),{...thisIpConfing,..._data},...ipConfigs.slice(action.ipConfigIndex+1)];
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        //CONGI-默认IP
        case ADD_CONFIG_DEFULT:
            var  thisTopoItems=state.topoItems[action.topoIndex],ipConfigs=thisTopoItems.topology_info.ipConfig,thisIpConfing=ipConfigs[action.ipConfigIndex];
            thisTopoItems.topology_info.ipConfig[action.ipConfigIndex].default=[...thisIpConfing.default,action.data];
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        case EDIT_CONFIG_DEFULT_DATA:
            var  thisTopoItems=state.topoItems[action.topoIndex],ipConfigs=thisTopoItems.topology_info.ipConfig,thisIpConfing=ipConfigs[action.ipConfigIndex],thisIpConfingdef=thisIpConfing.default[action.ipIndex];
            var _data=action.data;
            thisTopoItems.topology_info.ipConfig[action.ipConfigIndex].default=[...thisIpConfing.default.slice(0, action.ipIndex),{...thisIpConfingdef,..._data},...thisIpConfing.default.slice(action.ipIndex+1)];
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        case REMOVE_CONFIG_DEFULT:
            var  thisTopoItems=state.topoItems[action.topoIndex],ipConfigs=thisTopoItems.topology_info.ipConfig,thisIpConfing=ipConfigs[action.ipConfigIndex];
            thisTopoItems.topology_info.ipConfig[action.ipConfigIndex].default=[...thisIpConfing.default.slice(0, action.ipIndex),...thisIpConfing.default.slice(action.ipIndex+1)];
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        //省份
        case ADD_PROVINCE:
            var  thisTopoItems=state.topoItems[action.topoIndex],ipConfigs=thisTopoItems.topology_info.ipConfig,thisIpConfing=ipConfigs[action.ipConfigIndex];
            thisTopoItems.topology_info.ipConfig[action.ipConfigIndex].provinces=[...thisIpConfing.provinces,action.data];
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        case EDIT_PROVINCE:
            var  thisTopoItems=state.topoItems[action.topoIndex],ipConfigs=thisTopoItems.topology_info.ipConfig,thisIpConfing=ipConfigs[action.ipConfigIndex],thisPrivice=thisIpConfing.provinces[action.porvIndex];
            //console.log(action.data);
            var _data=action.data;
            thisTopoItems.topology_info.ipConfig[action.ipConfigIndex].provinces[action.porvIndex]={...thisPrivice,..._data};
           // console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        case REMOVE_PROVINCE:
            var  thisTopoItems=state.topoItems[action.topoIndex],ipConfigs=thisTopoItems.topology_info.ipConfig,thisIpConfing=ipConfigs[action.ipConfigIndex];
            thisTopoItems.topology_info.ipConfig[action.ipConfigIndex].provinces=[...thisIpConfing.provinces.slice(0, action.porvIndex),...thisIpConfing.provinces.slice(action.porvIndex+1)];
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        //ip
        case ADD_PROVINCE_IP:
            var  thisTopoItems=state.topoItems[action.topoIndex],
                ipConfigs=thisTopoItems.topology_info.ipConfig,
                thisIpConfing=ipConfigs[action.ipConfigIndex],
                thisProv=thisIpConfing.provinces[action.porvIndex]
                ;
            thisTopoItems.topology_info.ipConfig[action.ipConfigIndex].provinces[action.porvIndex].Ipinfo=[...thisProv.Ipinfo,action.data];
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        case EDIT_PROVINCE_IP:
            var  thisTopoItems=state.topoItems[action.topoIndex],
                ipConfigs=thisTopoItems.topology_info.ipConfig,
                thisIpConfing=ipConfigs[action.ipConfigIndex],
                thisProv=thisIpConfing.provinces[action.porvIndex],
                thisIp=thisProv.Ipinfo[action.ipIndex]
                ;
            var _data=action.data;
            thisTopoItems.topology_info.ipConfig[action.ipConfigIndex].provinces[action.porvIndex].Ipinfo[action.ipIndex]={...thisIp,..._data};
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        case REMOVE_PROVINCE_IP:
            var  thisTopoItems=state.topoItems[action.topoIndex],
                ipConfigs=thisTopoItems.topology_info.ipConfig,
                thisIpConfing=ipConfigs[action.ipConfigIndex],
                thisProv=thisIpConfing.provinces[action.porvIndex]
                //thisIp=thisProv.Ipinfo[action.ipIndex]
                ;
            //console.log(action.porvIndex);
           // console.log(thisIpConfing.provinces[action.porvIndex]);
            thisTopoItems.topology_info.ipConfig[action.ipConfigIndex].provinces[action.porvIndex].Ipinfo=[...thisProv.Ipinfo.slice(0, action.ipIndex),...thisProv.Ipinfo.slice(action.ipIndex+1)];
            //console.log(thisTopoItems);
            return {...state,topoItems:[
                ...state.topoItems.slice(0, action.topoIndex),
                thisTopoItems,
                ...state.topoItems.slice(action.topoIndex + 1)
            ]}
        default:
            return state
    }
}