import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
const obj2str = obj => JSON.stringify(obj, null, '  ');
const str2obj = str => JSON.parse(str);
const JsonEditor = props => {
  const {
    value,
    onSave = () => {}
  } = props;
  const [jsonStr, setJsonStr] = useState(obj2str(value));
  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    setJsonStr(obj2str(value));
  }, [value]);
  const handleChange = event => {
    const {
      value
    } = event.target;
    const {
      onChange
    } = props;
    setErrMsg('');
    try {
      const obj = str2obj(value);
      onChange(obj);
    } catch (error) {
      setErrMsg(`There is something wrong in JSON text, detail: ${error.message}`);
    }
    setJsonStr(value);
  };
  const handleKeyDown = event => {
    if (event.code === 'KeyS' && event.metaKey) {
      event.preventDefault();
      onSave();
    }
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input.TextArea, {
    autoSize: true,
    value: jsonStr,
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