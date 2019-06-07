import React from 'react';
import { Router, Route } from 'react-router-dom';
import MovieBoard from './movies/MovieBoard';
import MoviePage from './movies/MoviePage';
import history from '../history';



const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Route path="/" exact component={MovieBoard} />
                <Route path="/flix/:id" exact component={MoviePage} />
            </Router>
        </div>
    )
};

export default App;