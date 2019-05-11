import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import MovieReducer from './MovieReducer';
import GenreReducer from './GenreReducer';

export default combineReducers ({
    form: formReducer,
    movies: MovieReducer,
    genres: GenreReducer,
});