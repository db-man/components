import PropTypes from 'prop-types';
declare function ErrorAlert({ json, error, tplStr, record, }: {
    json: any;
    error: any;
    tplStr: any;
    record: any;
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
