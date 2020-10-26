import { connect } from 'react-redux';
import { compose } from 'redux';
import Products from './index';
import { getProducts, createProduct, editProduct, removeProduct, moveProduct } from '../../../actions/product';

const mapStateToProps = (state) => ({
  loading: state.product.loading,
  products: state.product.list,
  categories: state.category.list,
});

const mapDispatchToProps = { getProducts, createProduct, editProduct, removeProduct, moveProduct };

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(Products);
