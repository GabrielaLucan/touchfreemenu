import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';

import MenuBuilder from './index';
import * as productActions from '../../actions/product';
import * as categoryActions from '../../actions/category';

const mapStateToProps = (state) => ({
  loading: state.product.loading || state.category.loading || state.auth.loading,
  products: state.product.list,
  categories: state.category.list,
});

const mapDispatchToProps = { ...productActions, ...categoryActions };

const enhance = compose(withAuth, connect(mapStateToProps, mapDispatchToProps));

export default enhance(MenuBuilder);
