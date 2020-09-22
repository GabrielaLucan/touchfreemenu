import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../util/withAuth';
import { uploadPdf } from '../../actions/menu';
import { attemptLogin } from '../../actions/auth';

import Home from './Component';

const mapStateToProps = (state) => ({
  loading: state.auth.loading || state.menu.loading,
});

const mapDispatchToProps = { uploadPdf, attemptLogin };

const enhance = compose(reduxForm({ form: 'login' }), withAuth, connect(mapStateToProps, mapDispatchToProps));

const HomeContainer = enhance(Home);

export default HomeContainer;
