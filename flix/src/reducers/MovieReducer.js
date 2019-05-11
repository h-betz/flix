import {FETCH_MOVIES, SEARCH, FETCH_GENRES} from '../actions/types';
import _ from 'lodash';

/**
 * Handle our movie store
 */
export default (state={'movies': [], 'genres': []}, action) => {
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state.movies, ...action.payload
            }
        case SEARCH:
            return {..._.mapKeys(action.payload, 'id')};
        default:
            return state;
    }
};