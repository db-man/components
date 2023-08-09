import React, { useState, ChangeEvent } from 'react';
import { Input } from 'antd';

interface JsonEditorProps {
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = (props) => {
  const [jsonStr, setJsonStr] = useState(
    JSON.stringify(props.value, null, '  ')
  );
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    const { onChange } = props;

    setErrMsg('');
    try {
      const obj = JSON.parse(value) as Record<string, unknown>;
      onChange(obj);
    } catch (error) {
      setErrMsg(
        `There is something wrong in JSON text, detail: ${
          (error as Error).message
        }`
      );
    }

    setJsonStr(value);
  };

  return (
    <div>
      <Input.TextArea autoSize value={jsonStr} onChange={handleChange} />
      {errMsg && <div style={{ color: 'red' }}>{errMsg}</div>}
    </div>
  );
};

export default JsonEditor;
