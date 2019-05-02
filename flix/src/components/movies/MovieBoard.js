import React from 'react';
import { connect } from 'react-redux';
import Search from '../search/Search';
import MovieList from './MovieList';
import MovieItem from './MovieItem';
import SearchForm from '../search/SearchForm'
import { onMovieSelect, fetchMovies, searchMovies } from '../../actions';

class MovieBoard extends React.Component {

    componentDidMount() {
        this.props.fetchMovies();
    }

    onSubmit = formValues => {
        this.props.searchMovies(formValues);
    }

    renderList() {
        return this.props.movies.map((movie) => {
            return (
                <MovieItem movie={movie} onClick={() => this.props.onMovieSelect(movie)} key={movie.id} />
            );
        });
    }

    render() {
        return (
            <div style={{marginTop: '10px'}}>
                <div className="ui middle aligned center aligned grid" style={{marginTop: '10px'}}>
                    <h1 style={{color: "white"}}>Showvies</h1>
                </div>
                <div className="ui middle aligned center aligned grid">
                    <div>
                        <SearchForm onSubmit={this.onSubmit} />
                    </div>
                </div>
                    <table className="ui inverted selectable table">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="table-header">Title</th>
                                <th className="table-header">IMDB</th>
                                <th className="table-header">Rotten Tomatoes</th>
                                <th className="table-header">Genre</th>
                                <th className="table-header">Providers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: Object.values(state.movies),
    };
};

export default connect(mapStateToProps, {onMovieSelect, fetchMovies, searchMovies})(MovieBoard);