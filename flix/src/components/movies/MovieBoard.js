import React from 'react';
import { connect } from 'react-redux';
import '../../css/MovieList.css';
import MovieItem from './MovieItem';
import SearchForm from '../search/SearchForm'
import { onMovieSelect, fetchMovies, searchMovies, fetchGenres } from '../../actions';

class MovieBoard extends React.Component {

    /**
     * Fetch our data when the component has loaded
     */
    componentDidMount() {
        this.props.fetchMovies();
        this.props.fetchGenres();
    }

    /**
     * Handle form submission
     */
    onSubmit = formValues => {
        this.props.searchMovies(formValues);
    }

    /**
     * Render the table rows for the movie items
     */
    renderList() {
        let media = this.props.movies;
        if (!media || media.length === 0) {
            return <tr></tr>;
        }
        return this.props.movies.map((movie) => {
            return (
                <MovieItem movie={movie} onClick={() => this.props.onMovieSelect(movie)} key={movie.id} />
            );
        });
    }

    /**
     * Render our main dashboard component
     */
    render() {
        return (
            <div style={{marginTop: '10px'}}>
                <div className="ui middle aligned center aligned grid" style={{marginTop: '10px'}}>
                    <h1 style={{color: "white"}}>Showvies</h1>
                </div>
                <div className="ui middle aligned center aligned grid">
                    <div>
                        <SearchForm onSubmit={this.onSubmit} genres={this.props.genres} />
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
        genres: Object.values(state.genres),
    };
};

export default connect(mapStateToProps, {onMovieSelect, fetchMovies, searchMovies, fetchGenres})(MovieBoard);