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
        //ui celled definition compact table
        return (
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
        )
    }

}

const mapStateToProps = state => {
    return {
        movies: Object.values(state.movies),
    };
};

export default connect(mapStateToProps, {onMovieSelect, fetchMovies})(MovieList);
