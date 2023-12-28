import PropTypes from 'prop-types';
interface ListPageProps {
    tableName: string;
}
/**
 * URL params:
 * - page: number
 * - pageSize: number
 * - filter: string
 * - sorter: string
 * - view: string (table_view or image_view)
 */
declare const ListPage: {
    (props: ListPageProps): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        tableName: PropTypes.Validator<string>;
    };
};
export default ListPage;
//# sourceMappingURL=index.d.ts.map