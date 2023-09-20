import React from 'react';
export type ValueType = Record<string, any>;
type RowType = ValueType;
interface FormProps {
    defaultValues: ValueType;
    loading: boolean;
    rows: RowType[];
    onSubmit: (formValues: ValueType) => void;
    onDelete: (formValues: ValueType) => void;
}
declare const Form: React.FC<FormProps>;
export default Form;
//# sourceMappingURL=index.d.ts.map