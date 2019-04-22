import _ from 'lodash';
import {FETCH_MENU_ITEMS} from '../actions/types';


export default (state={}, action) => {
    switch (action.type) {
        case FETCH_MENU_ITEMS:
            return {...state, ..._.mapKeys(action.payload, 'id')}
            // return {...state, ...action.payload};
        default:
            return state;
    }
};