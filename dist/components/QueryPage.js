import { Row, Col } from 'antd';
import React, { useContext, useEffect } from 'react';
import JsonView from '@uiw/react-json-view';
import PageContext from '../contexts/page';
import ReactSimpleCodeEditor from './ReactSimpleCodeEditor';
const defaultCode = 'return rows.slice(0, 10);';
export default function QueryPage() {
  const {
    dbName,
    tableName,
    githubDb
  } = useContext(PageContext);
  const [code, setCode] = React.useState(defaultCode);
  const [result, setResult] = React.useState({
    obj: '',
    err: ''
  });
  const [content, setContent] = React.useState([]);
  useEffect(() => {
    githubDb?.getTableRows(dbName, tableName).then(response => {
      setContent(response.content);
    });
  }, []);
  useEffect(() => {
    try {
      // eslint-disable-next-line no-new-func
      const fn = Function('rows', code);
      const output = fn(content);
      setResult({
        obj: JSON.stringify(output),
        err: ''
      });
    } catch (err) {
      // console.log('[ERROR] Failed to eval function!');

      setResult({
        obj: '',
        err: err.message
      });
    }
  }, [content, code]);
  return /*#__PURE__*/React.createElement("div", {
    className: "dm-query-page"
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    span: 16
  }, "Code:", /*#__PURE__*/React.createElement(ReactSimpleCodeEditor, {
    height: "50em",
    value: code,
    onChange: setCode
  }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement(Col, {
    span: 8
  }, /*#__PURE__*/React.createElement("div", null, "Error:"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'red'
    }
  }, result.err), /*#__PURE__*/React.createElement("div", null, "Result:"), result.obj && /*#__PURE__*/React.createElement(JsonView, {
    value: JSON.parse(result.obj),
    collapsed: 1
  }))));
}
//# sourceMappingURL=QueryPage.js.map