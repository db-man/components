import PropTypes from 'prop-types';
import { RowType } from '../types/Data';
declare function ErrorAlert({ json, error, tplStr, record, }: {
    json: string;
    error: {
        message: string;
    };
    tplStr: string;
    record: RowType;
}): import("react/jsx-runtime").JSX.Element;
declare namespace ErrorAlert {
    var propTypes: {
        json: PropTypes.Validator<string>;
        error: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            message: PropTypes.Requireable<string>;
        }>>>;
        tplStr: PropTypes.Validator<string>;
        record: PropTypes.Validator<string>;
    };
}
export default ErrorAlert;
//# sourceMappingURL=ErrorAlert.d.ts.map