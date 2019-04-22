import {SEARCH} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH:
            return {...state, [action.payload.id]: action.payload};
        default:
            return state;
    }
};