import _ from 'lodash';
import * as actionTypes from './types';
import api from '../api/api';

/**
 * This action fetches a list of movies/shows to show on the home page
 */
export const fetchMovies = (count, skip) => async dispatch => {
    if (!count) {
        count = 50;
    }
    if (!skip) {
        skip = 50;
    }
    const response = await api.get(`/fetch?count=${count}&skip=${skip}`);
    dispatch({
        type: actionTypes.FETCH_MOVIES,
        payload: response.data
    });
};

/**
 * Fetch a list of all available genres
 */
export const fetchGenres = () => async dispatch => {
    const response = api.get('/genres');
    dispatch({
        type: actionTypes.FETCH_GENRES,
        payload: response.data
    });
};

/**
 * This action fetches details on the selected movie such as:
 * Which services have it, short description, as well as Rotten Tomatoes score
 * @param {the movie id} movie 
 */
export const onMovieSelect = movie => async dispatch => {
    const response = await api.post('/flick', {
        'id': movie
    });
    dispatch({
        type: actionTypes.FETCH_MOVIE,
        payload: response.data
    });
};

/**
 * This action returns a list of movies related to the user's search criteria
 * @param {the search form values} formValues 
 */
export const searchMovies = formValues => async dispatch => {
    const response = await api.post('/search', formValues);
    dispatch({
        type: actionTypes.SEARCH,
        payload: response.data,
    });
};