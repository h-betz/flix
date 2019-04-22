import _ from 'lodash';
import * as actionTypes from './types';
import api from '../api/api';

/**
 * This action fetches the menu choices
 */
export const fetchMenuItems = () => async dispatch => {
    const response = await api.get('/menu');
    dispatch({
        type: actionTypes.FETCH_MENU_ITEMS,
        payload: response.data
    });
};

/**
 * This action fetches the data assoicated with the menu option choice.
 * This might be better off as a get request
 * @param {menu item selection} menuItem 
 */
export const onMenuItemSelect = menuItem => async dispatch => {
    const response = await api.post('/menu', {
        'choice': menuItem
    });
    dispatch({
        type: actionTypes.FETCH_MENU_ITEM,
        payload: response.data
    });
};

/**
 * This action fetches a list of movies/shows to show on the home page
 */
export const fetchMovies = () => async dispatch => {
    const response = await api.get('/fetch');
    dispatch({
        type: actionTypes.FETCH_MOVIES,
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