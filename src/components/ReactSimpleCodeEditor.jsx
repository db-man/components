import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; // Example style, you can use another

export default function ReactSimpleCodeEditor({ value, onChange }) {
  return (
    <Editor
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: '12px',
        height: '50em',
        width: '60em',
        backgroundColor: 'white',
      }}
      value={value}
      highlight={(c) => highlight(c, languages.js)}
      padding={10}
      onValueChange={(c) => onChange(c)}
    />
  );
}

ReactSimpleCodeEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
