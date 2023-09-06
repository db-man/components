import PropTypes from 'prop-types';
import { InputProps } from './StringFormFieldValue';
import Column from '../types/Column';
interface StringFormFieldProps {
    label: string;
    column: Column;
    dbName: string;
    primaryKey: string;
    value?: string;
    inputProps?: InputProps;
    preview?: boolean;
    onChange: (value: string) => void;
}
declare function StringFormField(props: StringFormFieldProps): import("react/jsx-runtime").JSX.Element;
declare namespace StringFormField {
    var propTypes: {
        label: PropTypes.Validator<string>;
        value: PropTypes.Requireable<string>;
        preview: PropTypes.Requireable<boolean>;
        column: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            name: PropTypes.Requireable<string>;
            primary: PropTypes.Requireable<boolean>;
            referenceTable: PropTypes.Requireable<string>;
        }>>>;
        inputProps: PropTypes.Requireable<PropTypes.InferProps<{
            disabled: PropTypes.Requireable<boolean>;
            autoFocus: PropTypes.Requireable<boolean>;
            onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
    };
    var defaultProps: {
        value: string;
        preview: boolean;
        inputProps: {};
    };
}
export default StringFormField;
//# sourceMappingURL=StringFormField.d.ts.map