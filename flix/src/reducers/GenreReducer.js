import {FETCH_GENRES} from '../actions/types';
import _ from 'lodash';

/**
 * Handle the genre state
 */
export default (state={}, action) => {
    switch (action.type) {
        case FETCH_GENRES:
            return {
                ...state, ...action.payload
            };
        default:
            return state;
    }
};