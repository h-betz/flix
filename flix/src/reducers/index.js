import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import MenuReducer from './MenuReducer';
import SearchReducer from './SearchReducer';
import MovieReducer from './MovieReducer';

export default combineReducers ({
    form: formReducer,
    menu: MenuReducer,
    search: SearchReducer,
    movies: MovieReducer,
});