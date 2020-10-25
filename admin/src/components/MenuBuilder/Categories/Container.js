import { connect } from 'react-redux';
import { compose } from 'redux';
import Categories from './index';
import { getCategories, createCategory, moveCategory } from '../../../actions/category';

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  categories: state.category.list,
});

const mapDispatchToProps = { getCategories, createCategory, moveCategory };

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(Categories);
