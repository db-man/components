import React from 'react';
import PropTypes from 'prop-types';
import { columnType } from './types';
import * as constants from '../constants';

/**
 * Form field wrapper for create/update page
 */
const FieldWrapperForCreateUpdatePage = ({
  column,
  children
}) => {
  const typeClassName = column.type === constants.STRING_ARRAY ? 'dm-string-array-form-field' : 'dm-string-form-field';
  return /*#__PURE__*/React.createElement("div", {
    // key={column.id}
    className: `dm-form-field ${typeClassName}`,
    "data-debug": JSON.stringify(column)
  }, /*#__PURE__*/React.createElement("div", {
    className: "dm-field-label"
  }, /*#__PURE__*/React.createElement("b", null, column.name), ":", ' '), children);
};
FieldWrapperForCreateUpdatePage.propTypes = {
  column: columnType.isRequired,
  // value: PropTypes.oneOfType([
  //   PropTypes.number,
  //   PropTypes.bool,
  //   PropTypes.string,
  //   PropTypes.arrayOf(PropTypes.string),
  // ]),
  children: PropTypes.node
};
FieldWrapperForCreateUpdatePage.defaultProps = {
  // value: '',
  children: null
};
// FieldWrapper2.contextType = PageContext;

export default FieldWrapperForCreateUpdatePage;