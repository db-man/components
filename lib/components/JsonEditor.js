function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import PropTypes from 'prop-types';
import { Input, message } from 'antd';
export default class JsonEditor extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleChange", event => {
      const {
        value
      } = event.target;
      const {
        onChange
      } = this.props;
      try {
        const obj = JSON.parse(value);
        onChange(obj);
      } catch (error) {
        message.error(`There is something wrong in JSON text, detail: ${error.message}`);
      }
      this.setState({
        jsonStr: value
      });
    });
    this.state = {
      jsonStr: JSON.stringify(props.value, null, '  ')
    };
  }
  render() {
    const {
      jsonStr
    } = this.state;
    return /*#__PURE__*/React.createElement(Input.TextArea, {
      autoSize: true,
      value: jsonStr,
      onChange: this.handleChange
    });
  }
}
JsonEditor.propTypes = {
  value: PropTypes.object.isRequired,
  // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired
};