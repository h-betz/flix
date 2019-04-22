import React from 'react';
import { connect } from 'react-redux';
import '../../css/MovieList.css';
import MovieItem from './MovieItem';
import { onMovieSelect, fetchMovies } from '../../actions';

class MovieList extends React.Component {

    componentDidMount() {
        this.props.fetchMovies();
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
            <table className="ui celled definition compact table">
                <thead>
                    <tr>
                        <th className="table-header"></th>
                        <th className="table-header">Title</th>
                        <th className="table-header">IMDB Rating</th>
                        <th className="table-header">Rotten Tomatoes Score</th>
                        <th className="table-header">Other</th>
                        <th className="table-header">Providers</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                </tbody>
            </table>
        )
    }

}

const mapStateToProps = state => {
    return {
        movies: Object.values(state.movies),
    };
};

export default connect(mapStateToProps, {onMovieSelect, fetchMovies})(MovieList);
