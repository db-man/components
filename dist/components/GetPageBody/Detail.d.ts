import PropTypes from 'prop-types';
import { ValueType } from '../Form';
interface DetailProps {
    defaultValues: ValueType;
    refTables: Record<string, any>;
}
declare const Detail: {
    (props: DetailProps): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        defaultValues: PropTypes.Validator<object>;
    };
    defaultProps: {};
};
export default Detail;
//# sourceMappingURL=Detail.d.ts.map