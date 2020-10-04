import React from 'react';
import { Field } from 'redux-form';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import SubmitButton from '../shared/form/SubmitButton';
import { passwordConfirmValidator } from '../../util/validators';

export default class ChangePassword extends React.Component {
  componentDidMount() {
    this.redirectIfNotLoggedIn();
  }

  componentDidUpdate() {
    this.redirectIfNotLoggedIn();
  }

  redirectIfNotLoggedIn() {
    const { token, history } = this.props;
    if (!token) {
      history.push('/login');
    }
  }

  onSubmit = ({ currentPassword, newPassword }) => {
    this.props.attemptChangePassword(currentPassword, newPassword);
  };

  render() {
    return (
      <Form loading={this.props.loading} onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field type='password' name='currentPassword' label='parola curentă' component={renderField} />
        <Field type='password' name='newPassword' label='parolă nouă' component={renderField} />
        <Field type='password' name='newPasswordAgain' label='confirmă parola nouă' component={renderField} validate={passwordConfirmValidator} />
        <SubmitButton type='submit' text='Schimbă'></SubmitButton>
      </Form>
    );
  }
}
