import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RefTableLink from './RefTableLink';
import PageContext from '../contexts/page';
import { columnType } from './types';
import * as constants from '../constants';
import { useAppContext } from '../contexts/AppContext';
/**
 * Form field wrapper for detail page
 * TODO When value is an array, how to render RefTableLink
 */
const FieldWrapperForDetailPage = ({
  column,
  value,
  children
}) => {
  const {
    dbName
  } = useContext(PageContext);
  const {
    dbs
  } = useAppContext();
  const typeClassName = column.type === constants.STRING_ARRAY ? 'dm-string-array-form-field' : 'dm-string-form-field';
  return /*#__PURE__*/React.createElement("div", {
    // key={column.id}
    className: `dm-form-field ${typeClassName}`,
    "data-debug": JSON.stringify(column)
  }, /*#__PURE__*/React.createElement("div", {
    className: "dm-field-label"
  }, /*#__PURE__*/React.createElement("b", null, column.name, " (", /*#__PURE__*/React.createElement("code", null, column.id), ")", column.type === constants.STRING_ARRAY ? ` (count:${value ? value.length : 0})` : null), ":", ' ', column.referenceTable && typeof value === 'string' && /*#__PURE__*/React.createElement(RefTableLink, {
    dbName: dbName,
    tables: dbs[dbName],
    value: value,
    column: column
  })), children);
};
FieldWrapperForDetailPage.propTypes = {
  column: columnType.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.node
};
FieldWrapperForDetailPage.defaultProps = {
  value: '',
  children: null
};
export default FieldWrapperForDetailPage;
//# sourceMappingURL=FieldWrapperForDetailPage.js.map