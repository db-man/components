import PropTypes from 'prop-types';
declare function RefTableLinks({ value, column }: {
    value: any;
    column: any;
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