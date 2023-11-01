import React from 'react';
import PropTypes from 'prop-types';
import DbColumn from '../types/DbColumn';
/**
 * Form field wrapper for create/update page
 */
declare const FieldWrapperForCreateUpdatePage: {
    ({ column, children, }: {
        column: DbColumn;
        children: React.ReactNode;
    }): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        column: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            name: PropTypes.Requireable<string>;
            primary: PropTypes.Requireable<boolean>;
            referenceTable: PropTypes.Requireable<string>;
        }>>>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    defaultProps: {
        children: null;
    };
};
export default FieldWrapperForCreateUpdatePage;
//# sourceMappingURL=FieldWrapperForCreateUpdatePage.d.ts.map