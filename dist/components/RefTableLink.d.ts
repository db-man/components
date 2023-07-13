import PropTypes from 'prop-types';
declare function RefTableLink({ dbName, tables, value, column, }: {
    dbName: any;
    tables: any;
    value: any;
    column: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace RefTableLink {
    var propTypes: {
        dbName: PropTypes.Validator<string>;
        tables: PropTypes.Validator<(PropTypes.InferProps<{
            name: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        column: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            name: PropTypes.Requireable<string>;
            primary: PropTypes.Requireable<boolean>;
            referenceTable: PropTypes.Requireable<string>;
        }>>>;
        value: PropTypes.Requireable<NonNullable<string | (string | null | undefined)[] | null | undefined>>;
    };
    var defaultProps: {
        value: null;
    };
}
export default RefTableLink;
//# sourceMappingURL=RefTableLink.d.ts.map