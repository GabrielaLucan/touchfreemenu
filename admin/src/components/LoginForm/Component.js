import React from 'react';
import { Field } from 'redux-form';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import { usernameValidator as slugValidator, passwordValidator } from '../../util/validators';
import SubmitButton from '../shared/form/SubmitButton';

class LoginForm extends React.Component {
  componentDidMount() {
    this.redirectIfLoggedIn();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.token) {
      this.props.history.push({
        pathname: '/',
        state: {
          from: this.props.location.pathname,
        },
      });
    }
  }

  onSubmit = ({ username, password }) => {
    this.props.attemptLogin(username, password);
  };

  render() {
    return (
      <Form loading={this.props.loading} onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name='username' label='id restaurant' type='text' component={renderField} validate={slugValidator} />
        <Field name='password' label='parolă' type='password' component={renderField} validate={passwordValidator} />
        <SubmitButton type='submit' text='Intră'></SubmitButton>
      </Form>
    );
  }
}

export default LoginForm;
