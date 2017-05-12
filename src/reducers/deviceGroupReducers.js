import { ADD_DEV_GROUP,CHANGE_DEV_CHK,CLEAR_DEVS,ADD_DEV_GROUP_TOPOID,DEL_GROUP_TOPO} from '../actions/devGoupActions.js'
export default function devicesGroup (state = {}, action) {
    switch (action.type) {
        case ADD_DEV_GROUP:
            var _data=action.data;
            return {...state,..._data}
        case ADD_DEV_GROUP_TOPOID:
            var _data=action.data,topoId=state.topology_ids;
            var isId=false;
            if(topoId&&topoId.length){
                for(var i=0;i<topoId.length;i++){
                    if(_data._id==topoId[i]._id){
                        var thistopoId=topoId[i];
                        topoId[i]={...thistopoId,..._data};
                        isId=true;
                        break;
                    }
                }
            }
            if(!isId){
                topoId.push(_data);
            }
            state.topology_ids=topoId;
            //console.log(state.topology_ids);
            return {...state}
        case CHANGE_DEV_CHK:
            var _data=action.data,devDatas=state.devDatas,thisDev=devDatas[action.index],devs=state.device_ids;
            state.devDatas[action.index]={...thisDev,..._data};
            if(_data.isChk){
                state.device_ids={...devs,[thisDev._id]:thisDev.name};
            }else{
               // keys
                for(var k of Object.keys(devs)){
                    if(k==thisDev._id){
                        delete( state.device_ids[k]);
                        break;
                    }
                }

            }
            //state.device_ids={devs.slice(0,action.index),dev.slice(action.index+1)}
            return {...state}
        case CLEAR_DEVS:
            var devDatas=state.devDatas,data=action.data;
            state.device_ids={};
            if(devDatas){
                for(var i=0;i<devDatas.length;i++){
                    //state.devDatas[i].isChk=false;
                    var thisDev=state.devDatas[i];
                    state.devDatas[i]={...thisDev,...data}
                }
            }
            return {...state}
        case DEL_GROUP_TOPO:
            var topoId=state.topology_ids;
            state.topology_ids=[
                ...topoId.slice(0,action.index),
                ...topoId.slice(action.index+1)
            ];
            //console.log({...state});
            return {...state}
        default:
            return state
    }
}