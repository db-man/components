function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col } from 'antd';
export default class StringFormFieldValue extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "renderInput", () => {
      const {
        value,
        inputProps,
        onChange
      } = this.props;
      return /*#__PURE__*/React.createElement(Input, _extends({}, inputProps, {
        /* eslint-disable-line react/jsx-props-no-spreading */
        size: "small",
        value: value,
        onChange: event => {
          onChange(event.target.value, event);
        }
      }));
    });
    _defineProperty(this, "renderValue", () => {
      const {
        value,
        preview
      } = this.props;
      const input = this.renderInput();
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
    });
  }
  render() {
    return this.renderValue();
  }
}
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