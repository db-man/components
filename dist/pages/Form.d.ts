import PropTypes from 'prop-types';
declare function Form({ values, onChange }: {
    values: any;
    onChange: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Form {
    var propTypes: {
        values: PropTypes.Requireable<PropTypes.InferProps<{
            owner: PropTypes.Requireable<string>;
            token: PropTypes.Requireable<string>;
            repoName: PropTypes.Requireable<string>;
            repoPath: PropTypes.Requireable<string>;
        }>>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
    };
    var defaultProps: {
        values: {
            owner: string;
            token: string;
            repoName: string;
            repoPath: string;
        };
    };
}
export default Form;
//# sourceMappingURL=Form.d.ts.map