import PropTypes from 'prop-types';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
declare function ReactSimpleCodeEditor({ value, onChange }: {
    value: any;
    onChange: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace ReactSimpleCodeEditor {
    var propTypes: {
        value: PropTypes.Validator<string>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
    };
}
export default ReactSimpleCodeEditor;
//# sourceMappingURL=ReactSimpleCodeEditor.d.ts.map