import React from 'react';
import { Router, Route } from 'react-router-dom';
import MovieBoard from './movies/MovieBoard';
import history from '../history';



const App = () => {
    return (
        <div className="ui container">
            <MovieBoard />
        </div>
    )
};

export default App;