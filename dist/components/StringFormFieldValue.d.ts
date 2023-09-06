import React from 'react';
import PropTypes from 'prop-types';
export interface InputProps {
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    placeholder?: string;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}
interface StringFormFieldValueProps {
    value?: string;
    preview?: boolean;
    inputProps?: InputProps;
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}
declare const StringFormFieldValue: {
    (props: StringFormFieldValueProps): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        value: PropTypes.Requireable<string>;
        preview: PropTypes.Requireable<boolean>;
        inputProps: PropTypes.Requireable<PropTypes.InferProps<{
            disabled: PropTypes.Requireable<boolean>;
            autoFocus: PropTypes.Requireable<boolean>;
            onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        value: string;
        inputProps: {};
        preview: boolean;
        onChange: () => void;
    };
};
export default StringFormFieldValue;
//# sourceMappingURL=StringFormFieldValue.d.ts.map