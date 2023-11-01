import PropTypes from 'prop-types';
import DbColumn from '../types/DbColumn';
declare function RadioGroupFormField(props: {
    value: string;
    disabled: boolean;
    column: DbColumn;
    onChange: (value: string) => void;
}): import("react/jsx-runtime").JSX.Element;
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
//# sourceMappingURL=RadioGroupFormField.d.ts.map