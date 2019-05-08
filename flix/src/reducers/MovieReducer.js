import {FETCH_MOVIES, SEARCH, FETCH_GENRES} from '../actions/types';
import _ from 'lodash';

export default (state = {movies: [], genres: []}, action) => {
    switch (action.type) {
        case FETCH_MOVIES:
            let content = Object.values(action.payload);
            return {
                ...state,
                movies: content
            }
        case FETCH_GENRES:
            return {...state.genres, ..._.mapKeys(action.payload, 'id')};
        case SEARCH:
            return {..._.mapKeys(action.payload, 'id')};
        default:
            return state;
    }
};