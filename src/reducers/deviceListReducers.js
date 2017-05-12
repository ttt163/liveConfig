import { SEARCH_DEV,SHOW_DEV_LIST,EDIT_SEARCH_DEV,EDIT_DEV_LIST } from '../actions/actions'
export default function devicesList(state = {}, action) {
    switch (action.type) {
        case SEARCH_DEV:
            var search=state.search,actData=action.data;
            state.search={...search,...actData};
            return {...state}
        case EDIT_SEARCH_DEV:
            var search=state.search,query=search.query,actData=action.data;
            state.search.query={...query,...actData};
            return {...state}
        case SHOW_DEV_LIST:
            var _data={"list":action.data}
            return {...state,..._data}
        case EDIT_DEV_LIST:
            //console.log(state);
            var list=state.list,thisList=list[action.index],_data=action.data;
            state.list[action.index]={...thisList,..._data}
            return {...state}
        default:
            return state
    }
}