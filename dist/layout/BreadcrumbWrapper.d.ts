import PropTypes from 'prop-types';
declare function BreadcrumbWrapper(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace BreadcrumbWrapper {
    var propTypes: {
        dbName: PropTypes.Requireable<string>;
        tableName: PropTypes.Requireable<string>;
        action: PropTypes.Requireable<string>;
    };
    var defaultProps: {
        dbName: string;
        tableName: string;
        action: string;
    };
}
export default BreadcrumbWrapper;
