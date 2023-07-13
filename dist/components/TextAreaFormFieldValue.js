function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
export default class TextAreaFormFieldValue extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "handleChange", event => {
      const {
        onChange
      } = this.props;
      onChange(event.target.value);
    });
  }
  render() {
    const {
      value
    } = this.props;
    return /*#__PURE__*/React.createElement(Input.TextArea, _extends({
      rows: 3
    }, this.props, {
      /* eslint-disable-line react/jsx-props-no-spreading */
      value: value,
      onChange: this.handleChange
    }));
  }
}
TextAreaFormFieldValue.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};
TextAreaFormFieldValue.defaultProps = {
  value: '',
  onChange: () => {}
};
//# sourceMappingURL=TextAreaFormFieldValue.js.map