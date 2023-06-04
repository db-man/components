import { Row, Col } from 'antd';
import React, { useContext, useEffect } from 'react';
import ReactJson from 'react-json-view';
import { githubDb } from '@db-man/github';

import PageContext from '../contexts/page';
import ReactSimpleCodeEditor from './ReactSimpleCodeEditor';

const defaultCode = 'return input;';

export default function QueryPage() {
  const { dbName, tableName } = useContext(PageContext);
  const [code, setCode] = React.useState(defaultCode);
  const [result, setResult] = React.useState({ obj: '', err: '' });
  const [content, setContent] = React.useState([]);

  useEffect(() => {
    githubDb.getTableRows(dbName, tableName).then((response) => {
      setContent(response.content);
    });
  }, []);

  useEffect(() => {
    try {
      // eslint-disable-next-line no-new-func
      const fn = Function('input', code);

      const output = fn(content);
      setResult({ obj: JSON.stringify(output), err: '' });
    } catch (err) {
      // console.log('[ERROR] Failed to eval function!');

      setResult({ obj: '', err: err.message });
    }
  }, [content, code]);

  return (
    <div className="dm-query-page">
      <Row>
        <Col span={16}>
          Code:
          <ReactSimpleCodeEditor value={code} onChange={setCode} />
          <br />
        </Col>
        <Col span={8}>
          <div>Error:</div>
          <div style={{ color: 'red' }}>{result.err}</div>
          <div>Result:</div>
          {result.obj && <ReactJson src={JSON.parse(result.obj)} />}
        </Col>
      </Row>
    </div>
  );
}
