import PropTypes from 'prop-types';
/**
 * Form field wrapper for detail page
 * TODO When value is an array, how to render RefTableLink
 */
declare const FieldWrapperForDetailPage: {
    ({ column, value, children }: {
        column: any;
        value: any;
        children: any;
    }): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        column: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            name: PropTypes.Requireable<string>;
            primary: PropTypes.Requireable<boolean>;
            referenceTable: PropTypes.Requireable<string>;
        }>>>;
        value: PropTypes.Requireable<NonNullable<string | number | boolean | (string | null | undefined)[] | null | undefined>>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    defaultProps: {
        value: string;
        children: null;
    };
};
export default FieldWrapperForDetailPage;
