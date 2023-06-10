import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const JsonEditor = (props) => {
  const [jsonStr, setJsonStr] = useState(JSON.stringify(props.value, null, '  '));
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    const { onChange } = props;

    setErrMsg('');
    try {
      const obj = JSON.parse(value);
      onChange(obj);
    } catch (error) {
      setErrMsg(`There is something wrong in JSON text, detail: ${error.message}`);
    }

    setJsonStr(value);
  };

  return (
    <div>
      <Input.TextArea
        autoSize
        value={jsonStr}
        onChange={handleChange}
      />
      {errMsg && <div style={{ color: 'red' }}>{errMsg}</div>}
    </div>
  );
};

JsonEditor.propTypes = {
  value: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired,
};

export default JsonEditor;
