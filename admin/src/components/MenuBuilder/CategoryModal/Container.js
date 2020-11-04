import { connect } from 'react-redux';

import CategoryModal from './index';
import * as categoryActions from '../../../actions/category';

const mapStateToProps = (state) => ({ categories: state.category.list });

const mapDispatchToProps = { ...categoryActions };

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(CategoryModal);
