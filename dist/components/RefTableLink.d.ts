import PropTypes from 'prop-types';
import DbTable from '../types/DbTable';
import DbColumn from '../types/DbColumn';
declare function RefTableLink({ dbName, tables, value, column, }: {
    dbName: string;
    tables: DbTable[];
    value: string | string[] | null;
    column: DbColumn;
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