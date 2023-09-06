import React from 'react';
interface FormProps {
    defaultValues: Record<string, any>;
    loading: boolean;
    rows: Record<string, any>[];
    onSubmit: (formValues: Record<string, any>) => void;
    onDelete: (formValues: Record<string, any>) => void;
}
declare const Form: React.FC<FormProps>;
export default Form;
//# sourceMappingURL=index.d.ts.map