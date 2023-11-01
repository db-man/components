import PropTypes from 'prop-types';
import DbColumn from '../types/DbColumn';
declare function RefTableLinks({ value, column, }: {
    value: string | string[] | null;
    column: DbColumn;
}): import("react/jsx-runtime").JSX.Element;
declare namespace RefTableLinks {
    var propTypes: {
        value: PropTypes.Validator<NonNullable<NonNullable<string | (string | null | undefined)[] | null | undefined>>>;
        column: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            name: PropTypes.Requireable<string>;
            primary: PropTypes.Requireable<boolean>;
            referenceTable: PropTypes.Requireable<string>;
        }>>>;
    };
}
export default RefTableLinks;
//# sourceMappingURL=RefTableLinks.d.ts.map