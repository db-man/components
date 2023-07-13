import PropTypes from 'prop-types';
export declare const linkShape: {
    children: PropTypes.Requireable<string>;
    href: PropTypes.Requireable<string>;
    text: PropTypes.Requireable<string>;
};
export declare const link: PropTypes.Requireable<PropTypes.InferProps<{
    children: PropTypes.Requireable<string>;
    href: PropTypes.Requireable<string>;
    text: PropTypes.Requireable<string>;
}>>;
export declare const columnType: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Validator<string>;
    name: PropTypes.Requireable<string>;
    primary: PropTypes.Requireable<boolean>;
    referenceTable: PropTypes.Requireable<string>;
}>>;
export declare const tableType: PropTypes.Requireable<PropTypes.InferProps<{
    name: PropTypes.Requireable<string>;
}>>;
//# sourceMappingURL=types.d.ts.map