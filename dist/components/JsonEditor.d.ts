import React from 'react';
interface JsonEditorProps {
    value: Record<string, unknown>;
    onChange: (value: Record<string, unknown>) => void;
    onSave?: () => void;
}
declare const JsonEditor: React.FC<JsonEditorProps>;
export default JsonEditor;
//# sourceMappingURL=JsonEditor.d.ts.map