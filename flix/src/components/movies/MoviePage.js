import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import { fetchMovie } from '../../actions';

class MoviePage extends React.Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchMovie(this.props.match.params.id);
    }

    /**
     * Formats the list of genre strings into one comma separated string
     * @param {List of strings} genres 
     */
    formatGenres(genres) {
        let genreString = "";
        if (!genres) {
            return genreString;
        }
        genres.forEach(function (genre) {
            genreString += genre + ", ";
        });
        return genreString.slice(0, -2);
    }


    render() {
        let movie = this.props.movie;
        if (!this.props.movie) {
            return <div>Loading...</div>;
        }
        let genres = this.formatGenres(movie.genres);
        return (
            <div style={{color: "white"}}>
                <h1>{movie.title}</h1>
                <table>
                    <tr>
                        <td>
                        <img ref={this.imageRef} alt={movie.title} src={movie.thumbnail_url} className="middle aligned" width="102px" height="152px"/>
                        </td>
                        <td>
                            <p>{movie.description}</p>
                        </td>
                    </tr>
                </table>
                <br/>
                <div>
                    <h4>Genres</h4>
                    <div>
                        {genres}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        movie: state.movies[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, {fetchMovie}) (MoviePage);