import React, { useCallback, useContext, useEffect } from 'react';
import { message, Alert, Spin } from 'antd';
import * as utils from '../../utils';
import PageContext from '../../contexts/page';
import Detail from './Detail';
const GetPageBody = () => {
  const {
    dbName,
    tableName,
    appModes,
    primaryKey,
    githubDb,
    columns
  } = useContext(PageContext);
  const [contentLoading, setContentLoading] = React.useState(false);
  const [contentLoaded, setContentLoaded] = React.useState(false);
  const [refTables, setRefTables] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');
  const [record, setRecord] = React.useState({}); // One record in table rows

  // Create the initial form fields according to whether create/update.
  const getInitialFormFields = useCallback(tableRows => {
    const foundRows = tableRows.filter(item => item[primaryKey] === utils.getUrlParams()[primaryKey]);
    if (foundRows.length === 0) {
      setErrorMessage('item not found in db');
      return null;
    }
    if (foundRows.length > 1) {
      setErrorMessage('more than 1 rows');
      return null;
    }
    return {
      ...foundRows[0]
    };
  }, [primaryKey]);
  const getSingleRecordAsync = useCallback(() => {
    /**
     * If primary key is "itemId", and this field value is "foo", then return "foo"
     */
    const currentId = () => {
      return utils.getUrlParams()[primaryKey];
    };
    // ValueType vs DataType
    return githubDb.getRecordFileContentAndSha(dbName, tableName, currentId()).then(({
      content
    }) => {
      setContentLoaded(true);
      setRecord(content);
    }).catch(err => {
      console.error('githubDb.getRecordFileContentAndSha failed, err:', err);
      message.error('something wrong in githubDb.getRecordFileContentAndSha');
    });
  }, [dbName, tableName, githubDb, primaryKey]);
  const getTableRowsAsync = useCallback(() => {
    return githubDb?.getTableRows(dbName, tableName).then(({
      content
    }) => {
      return content;
    }).then(tableRows => {
      setContentLoaded(true);
      const r = getInitialFormFields(tableRows);
      if (r) {
        setRecord(r);
      } else {
        message.error('item not found in db');
      }
    }).catch(err => {
      console.error('getTableRows failed, err:', err);
      message.error('something wrong in getTableRows');
    });
  }, [dbName, tableName, getInitialFormFields, githubDb]);

  // page mount or db/table change load data
  useEffect(() => {
    setContentLoading(true);
    const ps = [];
    if (appModes.indexOf('split-table') !== -1) {
      ps.push(getSingleRecordAsync());
    } else {
      ps.push(getTableRowsAsync());
    }
    const getRefTablePromises = columns.filter(({
      referenceTable
    }) => referenceTable).map(({
      referenceTable
    }) => {
      return githubDb.getTableRows(dbName, referenceTable).then(({
        content
      }) => {
        setRefTables(prevRefTables => ({
          ...prevRefTables,
          [`ref:${referenceTable}:rows`]: content // TODO
        }));
      });
    });

    // console.debug('Start getting all table data...');
    Promise.all([...ps, ...getRefTablePromises]).then(() => {
      // console.debug('Finish getting all table data...');
    }).finally(() => {
      setContentLoading(false);
    });
  }, [dbName, tableName, columns, getSingleRecordAsync, getTableRowsAsync, githubDb, appModes]);
  const renderAlert = () => errorMessage && /*#__PURE__*/React.createElement(Alert, {
    message: errorMessage,
    type: "error"
  });
  const renderDetail = () => {
    if (record === null) {
      return null;
    }
    return /*#__PURE__*/React.createElement(Detail, {
      defaultValues: record,
      refTables: refTables
    });
  };
  if (contentLoading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }
  if (!contentLoaded) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "get-body-component"
  }, renderAlert(), renderDetail());
};
export default GetPageBody;
//# sourceMappingURL=index.js.map