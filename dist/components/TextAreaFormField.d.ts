import PropTypes from 'prop-types';
interface TextAreaFormFieldProps {
    label: string;
    value?: string;
    rows?: number;
    disabled?: boolean;
    onChange?: (value: string) => void;
}
declare function TextAreaFormField(props: TextAreaFormFieldProps): import("react/jsx-runtime").JSX.Element;
declare namespace TextAreaFormField {
    var propTypes: {
        label: PropTypes.Validator<string>;
        value: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    var defaultProps: {
        value: string;
        onChange: () => void;
    };
}
export default TextAreaFormField;
//# sourceMappingURL=TextAreaFormField.d.ts.map