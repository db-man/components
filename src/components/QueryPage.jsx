import { Row, Col } from 'antd';
import React, { useContext, useEffect } from 'react';
import ReactJson from 'react-json-view';
import { githubDb } from '@db-man/github';

import PageContext from '../contexts/page';
import ReactSimpleCodeEditor from './ReactSimpleCodeEditor';

export default function QueryPage() {
  const { dbName, tableName } = useContext(PageContext);
  const [value, setValue] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');
  const [result, setResult] = React.useState('');
  const [content, setContent] = React.useState([]);

  useEffect(() => {
    githubDb.getTableRows(dbName, tableName).then((response) => {
      setContent(response.content);
    });
  }, []);

  const handleChange = (val) => {
    setValue(val);

    try {
      // eslint-disable-next-line no-new-func
      const fn = Function('input', val);

      const output = fn(content);
      setResult(JSON.stringify(output));
      setErrMsg('');
    } catch (err) {
      // console.log('[ERROR] Failed to eval function!');

      setResult('');
      setErrMsg(err.message);
    }
  };

  return (
    <div className="dm-query-page">
      <Row>
        <Col span={16}>
          Code:
          <ReactSimpleCodeEditor value={value} onChange={handleChange} />
          <br />
        </Col>
        <Col span={8}>
          <div>Error:</div>
          <div style={{ color: 'red' }}>{errMsg}</div>
          <div>Result:</div>
          {result && <ReactJson src={JSON.parse(result)} />}
        </Col>
      </Row>
    </div>
  );
}
