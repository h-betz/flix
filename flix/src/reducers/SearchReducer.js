import {SEARCH} from '../actions/types';
import _ from 'lodash';

export default (state={}, action) => {
    switch (action.type) {
        case SEARCH:
            return {...state, ..._.mapKeys(action.payload, 'id')};//{...state, [action.payload.id]: action.payload};
        default:
            return state;
    }
};