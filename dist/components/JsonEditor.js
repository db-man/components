import React, { useState } from 'react';
import { Input } from 'antd';
import { str2obj } from './Form/helpers';
const JsonEditor = props => {
  const {
    value,
    onChange,
    onFormValueChange,
    onSave = () => {}
  } = props;
  const [errMsg, setErrMsg] = useState('');
  const handleChange = event => {
    onChange(event.target.value);
    setErrMsg('');
    try {
      const obj = str2obj(event.target.value);
      onFormValueChange(obj);
    } catch (error) {
      setErrMsg(`There is something wrong in JSON text, detail: ${error.message}`);
    }
  };
  const handleKeyDown = event => {
    if (event.code === 'KeyS' && event.metaKey) {
      event.preventDefault();
      onSave();
    }
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input.TextArea, {
    autoSize: true,
    value: value,
    onChange: handleChange,
    onKeyDown: handleKeyDown
  }), errMsg && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'red'
    }
  }, errMsg));
};
export default JsonEditor;
//# sourceMappingURL=JsonEditor.js.map