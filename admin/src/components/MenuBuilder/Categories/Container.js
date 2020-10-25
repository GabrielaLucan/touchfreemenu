import { connect } from 'react-redux';
import { compose } from 'redux';
import Categories from './index';
import { getCategories, createCategory, editCategory, moveCategory } from '../../../actions/category';

const mapStateToProps = (state) => ({
  loading: state.category.loading,
  categories: state.category.list,
});

const mapDispatchToProps = { getCategories, createCategory, editCategory, moveCategory };

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(Categories);
