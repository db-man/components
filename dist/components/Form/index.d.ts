import React from 'react';
import { RowType } from '../../types/Data';
export type ValueType = RowType;
interface FormProps {
    defaultValues: ValueType;
    loading: boolean;
    rows: RowType[];
    onSubmit: (formValues: ValueType) => void;
    onDelete?: (formValues: ValueType) => void;
}
declare const Form: React.FC<FormProps>;
export default Form;
//# sourceMappingURL=index.d.ts.map