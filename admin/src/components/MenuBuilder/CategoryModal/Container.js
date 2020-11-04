import { connect } from 'react-redux';
import EditModal from './index';

const mapStateToProps = (state) => ({
  categories: state.category.list,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EditModal);
