import { ADD_CLMS_CHANNEL} from '../actions/clmsActions.js'
export default function clmsChannel(state = {}, action) {
    switch (action.type) {
        case ADD_CLMS_CHANNEL:
            var actData=action.data;
            return {...state,...actData}
        default:
            return state
    }
}