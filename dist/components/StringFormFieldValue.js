function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col } from 'antd';
const StringFormFieldValue = props => {
  const {
    value,
    preview
  } = props;
  const renderInput = () => {
    const {
      value,
      inputProps,
      onChange = () => {}
    } = props;
    return /*#__PURE__*/React.createElement(Input, _extends({}, inputProps, {
      size: "small",
      value: value,
      onChange: event => {
        onChange(event.target.value, event);
      }
    }));
  };
  const input = renderInput();

  // DELETE
  if (!preview) {
    return input;
  }
  return /*#__PURE__*/React.createElement(Row, {
    gutter: 16
  }, /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, input), /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement("a", {
    href: value,
    target: "_blank",
    rel: "noreferrer"
  }, value ? /*#__PURE__*/React.createElement("img", {
    width: "200px",
    src: value,
    alt: "img",
    style: {
      border: '1px solid'
    }
  }) : null)));
};
export default StringFormFieldValue;
StringFormFieldValue.propTypes = {
  value: PropTypes.string,
  preview: PropTypes.bool,
  inputProps: PropTypes.shape({
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onKeyDown: PropTypes.func
  }),
  onChange: PropTypes.func
};
StringFormFieldValue.defaultProps = {
  value: '',
  // Props to pass directly to antd's Input component
  inputProps: {
    // disabled
    // autoFocus
    // onKeyDown
  },
  preview: false,
  onChange: () => {}
};
//# sourceMappingURL=StringFormFieldValue.js.map