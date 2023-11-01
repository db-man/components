function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const TextAreaFormFieldValue = props => {
  const handleChange = event => {
    const {
      onChange
    } = props;
    onChange(event.target.value);
  };
  const {
    value
  } = props;
  return /*#__PURE__*/React.createElement(Input.TextArea, _extends({
    rows: 3
  }, props, {
    /* eslint-disable-line react/jsx-props-no-spreading */
    value: value,
    onChange: handleChange
  }));
};
TextAreaFormFieldValue.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};
TextAreaFormFieldValue.defaultProps = {
  value: '',
  onChange: () => {}
};
export default TextAreaFormFieldValue;
//# sourceMappingURL=TextAreaFormFieldValue.js.map