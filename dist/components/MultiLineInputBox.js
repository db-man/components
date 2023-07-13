function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const str2arr = str => str.split('\n');
const arr2str = arr => arr.join('\n');
export default function MultiLineInputBox(props) {
  const {
    value,
    onChange
  } = props;
  const handleChange = event => {
    onChange(str2arr(event.target.value));
  };
  return /*#__PURE__*/React.createElement(Input.TextArea, _extends({
    rows: 3
  }, props, {
    /* eslint-disable-line react/jsx-props-no-spreading */
    value: arr2str(value),
    onChange: handleChange
  }));
}
MultiLineInputBox.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
};
MultiLineInputBox.defaultProps = {
  value: [],
  onChange: () => {}
};
//# sourceMappingURL=MultiLineInputBox.js.map