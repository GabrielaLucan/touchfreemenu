import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import MenuBuilder from './index';

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = {};

const enhance = compose(withAuth, connect(mapStateToProps, mapDispatchToProps));

export default enhance(MenuBuilder);
