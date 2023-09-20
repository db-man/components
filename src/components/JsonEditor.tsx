import React, { useState, ChangeEvent, useEffect } from 'react';
import { Input } from 'antd';

import { ValueType } from './Form';

interface JsonEditorProps {
  value: ValueType;
  onChange: (value: ValueType) => void;
  onSave?: () => void;
}

const obj2str = (obj: ValueType) => JSON.stringify(obj, null, '  ');
const str2obj = (str: string) => JSON.parse(str) as ValueType;

const JsonEditor: React.FC<JsonEditorProps> = (props) => {
  const { value, onSave = () => {} } = props;
  const [jsonStr, setJsonStr] = useState(obj2str(value));
  const [errMsg, setErrMsg] = useState('');

  // when outside value changed, update jsonStr
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'KeyS' && event.metaKey) {
      event.preventDefault();
      onSave();
    }
  };

  return (
    <div>
      <Input.TextArea
        autoSize
        value={jsonStr}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {errMsg && <div style={{ color: 'red' }}>{errMsg}</div>}
    </div>
  );
};

export default JsonEditor;
