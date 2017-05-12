import { ADD_CLUSTER,ADD_LEVEL,DEL_LEVEL,CLEAR_LEVEL,EDIT_LEVEL} from '../actions/clusterActions.js'
import { reverseBykey} from '../components/Cluster.add.level.js'
export default function cluster(state = {}, action) {
    switch (action.type) {
        case ADD_CLUSTER:
            var _data = action.data;
            return {...state, ..._data}
        case ADD_LEVEL:
            var data = action.data,levels= state.level_devs_group;
            //state.level_devs_group.splice(action.index,0,data);
            state.level_devs_group=[
                ...levels.slice(0,action.index),
                ...data,
                ...levels.slice(action.index)
            ];
            //state.level_devs_group.reverse();
            for(var i=0;i<state.level_devs_group.length;i++){
                state.level_devs_group[i].level=(i+2).toString();
            }
            //state.level_devs_group=reverseBykey(state.level_devs_group,"level");
            return {...state}
        case DEL_LEVEL:
            var level_devs_group=state.level_devs_group;
            state.level_devs_group=[
                ...level_devs_group.slice(0,action.index),
                ...level_devs_group.slice(action.index+action.len)
            ];
           // state.level_devs_group.reverse();
            for(var i=0;i<state.level_devs_group.length;i++){
                state.level_devs_group[i].level=(i+2).toString();
            }
            //state.level_devs_group=reverseBykey(state.level_devs_group,"level");
            //state.level_devs_group.reverse();
            return {...state}
        case EDIT_LEVEL:
            var thisLevel=state.level_devs_group[action.index],data=action.data;
            state.level_devs_group[action.index]={
                ...thisLevel,
                ...data
            }
            //console.log(state.level_devs_group);
            return {...state}
       /* case CLEAR_LEVEL:
            var thisLevel=state.level_devs_group[action.index];
            state.level_devs_group[action.index]={
                ...thisLevel,
                "main_devs_group_id ": "",
                "main_topology_id ": ""
            }
            return {...state}*/
        default:
            return state
    }
}