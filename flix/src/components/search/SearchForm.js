import React from 'react';
import { Field, reduxForm } from 'redux-form';

class SearchForm extends React.Component {

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
            padding: 10,
        };
        return (
            <label className="field" style={checkboxStyle}>
                <input {...input} type="checkbox" />
                {label}
                {this.renderError(meta)}
            </label>
        );
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="equal width fields">
                    {/* <div className="grouped fields"> */}
                    <div className="field">
                        <label style={{color: "white"}}>Title</label>
                        <Field name="title" component={this.renderInput} label="Title"/>
                    </div>
                </div>
                <div className="inline fields">
                    <label style={{color: "white"}}>Provider</label>
                    <Field name="provider" component={this.renderCheckbox} label="Netflix" />
                    <Field name="provider" component={this.renderCheckbox} label="Hulu" />
                    <Field name="provider" component={this.renderCheckbox} label="HBO" />
                    <Field name="provider" component={this.renderCheckbox} label="Amazon Prime" />
                </div>
                <div className="field">
                    <label style={{color: "white"}}>Genre</label>
                        <Field name="genre" component="select" label="genre">
                            <option value="" className="text">Select One</option>
                            <option value="Action" className="text">Action</option>
                            <option value="Adventure" className="text">Adventure</option>
                            <option value="Comedy" className="text">Comedy</option>
                            <option value="Drama" className="text">Drama</option>
                            <option value="Horror" className="text">Horror</option>
                        </Field>
                </div>
                <div className="field" style={{marginLeft: '10px'}}>
                    <button className="ui button primary">Submit</button>
                </div>
                    {/* </div> */}
            </form>
        );
    }

}

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