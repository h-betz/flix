import React from 'react';

class MoviePage extends React.Component {


    render() {
        let title = this.props.movie.title;
        console.log(title);
        return (
            <div>
                <h1>{title}</h1>
            </div>
        );
    }
}

export default MoviePage;