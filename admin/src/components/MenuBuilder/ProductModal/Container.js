import { connect } from 'react-redux';

import ProductModal from './index';
import * as productActions from '../../../actions/category';

const mapStateToProps = (state) => ({
  categories: state.category.list,
  product: state.product.list,
});

const mapDispatchToProps = { ...productActions };

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductModal);
