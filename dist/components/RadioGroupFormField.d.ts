import PropTypes from 'prop-types';
declare function RadioGroupFormField(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace RadioGroupFormField {
    var propTypes: {
        value: PropTypes.Validator<string>;
        disabled: PropTypes.Validator<boolean>;
        column: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            name: PropTypes.Requireable<string>;
            primary: PropTypes.Requireable<boolean>;
            referenceTable: PropTypes.Requireable<string>;
        }>>>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    var defaultProps: {
        onChange: () => void;
    };
}
export default RadioGroupFormField;
