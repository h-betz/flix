import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MoviePage from './MoviePage';
import { fetchMovie } from '../../actions';

class MovieItem extends React.Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.imageRef.current.addEventListener('load', this.setSpans);
    }

    /**
     * Takes a list of provider strings and converts it to a comma separated string
     * @param {List of providers for this show or movie} providers 
     */
    formatProviders(providers) {
        let providerString = "";
        if (!providers) {
            return providerString;
        }
        providers.forEach(function (provider) {
            providerString += provider + ", ";
        })
        return providerString.slice(0, -2);
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
        if (!this.props.movie) {
            return <tr></tr>
        }
        const {title, thumbnail_url, imdb_rating, rt_rating} = this.props.movie;
        let providers = this.formatProviders(this.props.movie.providers);
        let genres = this.formatGenres(this.props.movie.genres);
        return (
            <tr className="movie-row" >
                <Link to={`/flix/${this.props.movie.id}`}>
                    <td>
                        <img ref={this.imageRef} alt={title} src={thumbnail_url} className="middle aligned" width="51px" height="76px"/>
                    </td>
                </Link>
                <td>
                    {title}
                </td>
                <td>
                    {imdb_rating}               
                </td>
                <td>
                    {rt_rating}
                </td>
                <td>
                    {genres}
                </td>
                <td>
                    {providers}
                </td>
            </tr>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        movie: ownProps.movie,
    };
};

export default connect(mapStateToProps, {fetchMovie})(MovieItem);