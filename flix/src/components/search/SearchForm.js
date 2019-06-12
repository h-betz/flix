import React from 'react';
import { Field, reduxForm } from 'redux-form';

class SearchForm extends React.Component {

    /**
     * Return an error message if the conditions exist for it
     * @param {error, touched} param0 
     */
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    /***
     * Generate the input fields
     */
    renderInput = ({input, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <input {...input} autoComplete="off" placeholder="Title" />
                {this.renderError(meta)}
            </div>
        );
    }

    /**
     * Generate checkboxes
     */
    renderCheckbox = ({input, label, value, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        const checkboxStyle = {
            color: 'white',
        };
        return (
            <label className="field" >
                <input {...input} type="checkbox" />
                <label style={checkboxStyle}>{label}</label>
                {this.renderError(meta)}
            </label>
        );
    }

    /**
     * Render the list of genres
     */
    renderGenres() {
        return this.props.genres.map((genre) => {
            return (
                <option value={genre.id} className="text">{genre.name}</option>
            );
        });
    }

    /**
     * Handle form submission
     */
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="equal width fields">
                    <div className="field">
                        <label style={{color: "white"}}>Title</label>
                        <Field name="title" component={this.renderInput} label="Title"/>
                    </div>
                </div>
                <div className="inline fields">
                    <label style={{color: "white"}}>Provider</label>
                    <Field name="netflix" component={this.renderCheckbox} label="Netflix" />
                    <Field name="hulu" component={this.renderCheckbox} label="Hulu" />
                    <Field name="hbo" component={this.renderCheckbox} label="HBO" />
                    <Field name="amazon" component={this.renderCheckbox} label="Amazon Prime" />
                </div>
                <div className="field">
                    <label style={{color: "white"}}>Genre</label>
                        <Field name="genre" component="select" label="genre">
                            <option value="" className="text">Select One</option>
                            {this.renderGenres()}
                        </Field>
                </div>
                <div className="field" style={{marginLeft: '10px'}}>
                    <button className="ui button primary">Submit</button>
                </div>
            </form>
        );
    }

}

/**
 * Validate user inputs
 * @param {user inputs} formValues 
 */
const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.amount = 'You must enter a title';
    }

    return errors;
}

export default reduxForm({
    form: 'SearchForm',
    validate
})(SearchForm);