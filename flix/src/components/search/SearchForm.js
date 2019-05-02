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

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="equal width fields">
                    <div className="inline fields">
                        <label>Title</label>
                            <Field name="title" component={this.renderInput} label="Title"/>
                        <label>Provider</label>
                            <Field name="provider" component="select" label="Provider">
                                <option value="Netflix" className="text">Netflix</option>
                                <option value="Hulu" className="text">Hulu</option>
                                <option value="HBO" className="text">HBO</option>
                                <option value="Amazon Prime" className="text">Amazon Prime</option>
                            </Field>
                        <div className="field" style={{marginLeft: '10px'}}>
                            <button className="ui button primary">Submit</button>
                        </div>
                    </div>
                </div>
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