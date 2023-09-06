import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import Column from '../types/Column';
interface FieldWrapperProps {
    column: Column;
    value: number | boolean | string | string[];
    children: ReactNode;
}
/**
 * Form field wrapper for detail page
 * TODO When value is an array, how to render RefTableLink
 */
declare const FieldWrapperForDetailPage: {
    ({ column, value, children, }: FieldWrapperProps): import("react/jsx-runtime").JSX.Element;
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
//# sourceMappingURL=FieldWrapperForDetailPage.d.ts.map