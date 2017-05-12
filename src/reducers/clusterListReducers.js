import { SHOW_CLUS_LIST,EDIT_CLUS_SEARCH} from '../actions/clusterActions.js'
import { reverseBykey} from '../components/Cluster.add.level.js'
export default function clusterList(state = {}, action) {
    switch (action.type) {
        case SHOW_CLUS_LIST:
            var _data = action.data;
            return {...state,..._data};
        case EDIT_CLUS_SEARCH:
            var aData = action.data,query=state.search.query;
            state.search.query={...query,...aData};
             return {...state}
        default:
            return state
    }
}