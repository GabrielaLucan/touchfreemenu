import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../util/withAuth';
import { attemptChangePassword } from '../../actions/auth';
import MenuBuilder from './index';

const mapStateToProps = state => ({
  loading: state.auth.loading
});

const mapDispatchToProps = { attemptChangePassword };

const enhance = compose(
  reduxForm({ form: 'changePassword' }),
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(MenuBuilder);
