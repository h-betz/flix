import React from 'react';
import Search from '../search/Search';
import MovieList from './MovieList';

class MovieBoard extends React.Component {


    render() {
        return (
            <div style={{marginTop: '10px'}}>
                <div className="ui middle aligned center aligned grid" style={{marginTop: '10px'}}>
                    <h1 style={{color: "white"}}>Showvies</h1>
                </div>
                <div className="ui middle aligned center aligned grid">
                    <div>
                        <Search />
                    </div>
                </div>
                    <MovieList />
            </div>
        )
    }
}

export default MovieBoard;