import React from 'react';
import { connect } from 'react-redux';
import { searchMovies } from '../../actions';
import SearchForm from './SearchForm';

class Search extends React.Component {

    onSubmit = formValues => {
        this.props.searchMovies(formValues);
    }

    render() {
        return (
            <div>
                <SearchForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, {searchMovies})(Search);