import React from 'react';
import { ValueType } from './Form';
interface JsonEditorProps {
    value: string;
    onChange: (value: string) => void;
    onFormValueChange: (value: ValueType) => void;
    onSave?: () => void;
}
declare const JsonEditor: React.FC<JsonEditorProps>;
export default JsonEditor;
//# sourceMappingURL=JsonEditor.d.ts.map