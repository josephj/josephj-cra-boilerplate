import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveProducts, setLimit, setPage } from './redux';

const mapStateToProps = store => {
  const {
    data,
    meta,
    meta: { page, limit }
  } = store.products;
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: data.slice(start, end),
    total: data.length,
    ...meta
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ retrieveProducts, setLimit, setPage }, dispatch);
};
const mergeProps = (stateProps, dispatchProps) => {
  const { retrieveProducts, setLimit, setPage } = dispatchProps;
  return {
    ...stateProps,
    onWillMount: () => retrieveProducts(),
    onLimitChange: e => setLimit(parseInt(e.target.value, 10)),
    onPageChange: e => setPage(parseInt(e.target.value), 10)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
);
