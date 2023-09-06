import PropTypes from 'prop-types';
interface MultiLineInputBoxProps {
    rows?: number;
    disabled?: boolean;
    value?: string[];
    onChange?: (value: string[]) => void;
}
declare function MultiLineInputBox(props: MultiLineInputBoxProps): import("react/jsx-runtime").JSX.Element;
declare namespace MultiLineInputBox {
    var propTypes: {
        value: PropTypes.Requireable<(string | null | undefined)[]>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    var defaultProps: {
        value: never[];
        onChange: () => void;
    };
}
export default MultiLineInputBox;
//# sourceMappingURL=MultiLineInputBox.d.ts.map