import { SEARCH_DEVGROUP,SHOW_DEVGROUP_LIST,EDIT_SEARCH_DEVGROUP} from '../actions/devGoupActions.js'
export default function devGroupList(state = {}, action) {
    switch (action.type) {
        case SEARCH_DEVGROUP:
            var search=state.search,actData=action.data;
            state.search={...search,...actData};
            return {...state}
        case EDIT_SEARCH_DEVGROUP:
            var search=state.search,query=search.query,actData=action.data;
            state.search.query={...query,...actData};
            return {...state}
        case SHOW_DEVGROUP_LIST:
            var data=action.data;
            if(data){
                //console.log(data);
                for(var i=0;i<data.length;i++){
                    var ThisData=data[i];
                    data[i]={...ThisData,"devItem":[],"topoItem":[]};
                    for(var [k,v] of Object.entries(data[i].device_ids)){
                        data[i].devItem.push({"_id":k,"name":v});
                    }
                    //console.log(data[i]);
                    data[i].topoItem=!data[i].topology_ids?[]:data[i].topology_ids;
                    /*if(!data[i].topology_ids){

                    }else{
                        data[i].topoItem=
                        /!*for(var [k1,v1] of Object.entries(data[i].topology_ids)){
                            data[i].topoItem=[... data[i].topoItem,{"_id":k1,"name":v1}]
                        }*!/
                    }*/

                }
            }

            var _data={"list":data}
            return {...state,..._data}
        default:
            return state
    }
}