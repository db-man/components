import React, { useState, ChangeEvent, useEffect } from 'react';
import { Input } from 'antd';

interface JsonEditorProps {
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}

const obj2str = (obj: Record<string, unknown>) =>
  JSON.stringify(obj, null, '  ');
const str2obj = (str: string) => JSON.parse(str) as Record<string, unknown>;

const JsonEditor: React.FC<JsonEditorProps> = (props) => {
  const { value } = props;
  const [jsonStr, setJsonStr] = useState(obj2str(value));
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setJsonStr(obj2str(value));
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    const { onChange } = props;

    setErrMsg('');
    try {
      const obj = str2obj(value);
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
