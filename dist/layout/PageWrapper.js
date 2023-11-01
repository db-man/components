/* eslint-disable react/prop-types, react/destructuring-assignment, max-len, no-console, react/no-unused-class-component-methods */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { message, Spin } from 'antd';
import { GithubDb } from '@db-man/github';
import { getTablesByDbName } from '../dbs';
import * as constants from '../constants';
import { getPrimaryKey } from '../utils';
import PageContext from '../contexts/page';
import NavBar from '../components/NavBar';
import CreatePage from '../components/CreatePage';
import UpdatePage from '../components/UpdatePage';
import ListPage from '../components/ListPage';
import RandomPage from '../components/RandomPage';
import TagsCloudPage from '../components/TagsCloudPage';
import GetPage from '../components/GetPage';
import TableConfigPage from '../components/TableConfigPage';
import QueryPage from '../components/QueryPage';
import { useAppContext } from '../contexts/AppContext';
const {
  Provider
} = PageContext;
const mapp = {
  list: ListPage,
  random: RandomPage,
  create: CreatePage,
  update: UpdatePage,
  get: GetPage,
  tagsCloud: TagsCloudPage,
  tableConfig: TableConfigPage,
  query: QueryPage
};
export function TableList({
  dbName
}) {
  const {
    dbs
  } = useAppContext();
  if (!dbs) return null;
  const tablesOfSelectedDb = dbs[dbName];
  return /*#__PURE__*/React.createElement("div", null, tablesOfSelectedDb.map(({
    name: tName
  }) => /*#__PURE__*/React.createElement("li", {
    key: tName
  }, /*#__PURE__*/React.createElement(Link, {
    to: `/${dbName}/${tName}`
  }, tName))));
}
export function ActionList({
  dbName,
  tableName
}) {
  return /*#__PURE__*/React.createElement("div", null, "List of actions in table:", ['list', 'create'].map(action => /*#__PURE__*/React.createElement("li", {
    key: action
  }, /*#__PURE__*/React.createElement(Link, {
    to: `/${dbName}/${tableName}/${action}`
  }, action))));
}

/**
 * To render list/create/update page for `/db_name/table_name.json`
 */
const PageWrapper = props => {
  // tables is got from db repo db_name/columns.json which contain all tables column definition in current database
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const githubDbRef = useRef(new GithubDb({
    personalAccessToken: localStorage.getItem(constants.LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN),
    repoPath: localStorage.getItem(constants.LS_KEY_GITHUB_REPO_PATH),
    owner: localStorage.getItem(constants.LS_KEY_GITHUB_OWNER),
    repoName: localStorage.getItem(constants.LS_KEY_GITHUB_REPO_NAME),
    dbsSchema: localStorage.getItem(constants.LS_KEY_DBS_SCHEMA)
  }));
  useEffect(() => {
    // TODO we could get online and offline at the same time
    // then we only use offline data to render
    // then we compare the offline data with online data, if there is any diff, we show alert
    const onlineEnabled = false;
    if (onlineEnabled) {
      getOnlineData();
    } else {
      getOfflineData();
    }
    const {
      action,
      tableName
    } = pageInfo();
    document.title = `${action} ${tableName}`;
  }, []);
  const columns = () => {
    const {
      dbName,
      tableName
    } = props;
    const tablesOfSelectedDb = getTablesByDbName(dbName);
    if (!tablesOfSelectedDb) return [];
    const currentTable = tablesOfSelectedDb.find(table => table.name === tableName);
    if (!currentTable) return [];
    return currentTable.columns;
  };
  const pageInfo = () => {
    const {
      dbName,
      tableName,
      action
    } = props;
    return {
      // e.g. ['split-table']
      appModes: localStorage.getItem(constants.LS_KEY_GITHUB_REPO_MODES) ? localStorage.getItem(constants.LS_KEY_GITHUB_REPO_MODES).split(',') : [],
      dbName: dbName || '',
      tableName: tableName || '',
      action: action || '',
      columns: columns(),
      primaryKey: getPrimaryKey(columns()),
      tables: getTablesByDbName(dbName),
      githubDb: githubDbRef.current
    };
  };
  const getOnlineData = async () => {
    try {
      setLoading(true);
      const _tables = await githubDbRef.current.getDbTablesSchemaAsync(props.dbName);
      console.debug('use online columns', _tables);
      setTables(_tables);
    } catch (error) {
      console.error('Failed to get column JSON file in List component, error:', error);
      message.error('Failed to get online columns definition!');
    }
    setLoading(false);
  };
  const getOfflineData = () => {
    if (!localStorage.getItem(constants.LS_KEY_DBS_SCHEMA)) {
      setErrMsg('No DBS schema defined in localStorage!');
      return;
    }
    const _tables = JSON.parse(localStorage.getItem(constants.LS_KEY_DBS_SCHEMA) || '{}')[props.dbName || ''];
    setTables(_tables);
  };
  const renderTableListInDb = () => /*#__PURE__*/React.createElement("div", null, "List of tables in DB:", /*#__PURE__*/React.createElement(TableList, {
    dbName: props.dbName || ''
  }));
  const renderActionInTable = () => /*#__PURE__*/React.createElement(ActionList, {
    dbName: props.dbName || '',
    tableName: props.tableName || ''
  });
  const {
    dbName,
    tableName,
    action
  } = props;

  // if (!tableName) {
  //   return this.renderTableListInDb();
  // }

  // if (!action) {
  //   return this.renderActionInTable();
  // }

  const errMsgs = [];
  if (errMsg) {
    errMsgs.push(errMsg);
  }
  if (!dbName) {
    errMsgs.push('dbName is undefined!');
  }
  if (getPrimaryKey(columns()) === null) {
    errMsgs.push('Primary key not found on table!');
  }
  if (columns().length === 0) {
    errMsgs.push('No columns found for this table!');
  }
  if (errMsgs.length > 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "dm-page-v2 err-msg"
    }, errMsgs.join(' ,'));
  }
  const PageComponent = mapp[action || ''];
  if (!PageComponent) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "404 - PageComponent Not Found"), /*#__PURE__*/React.createElement("div", null, `/${dbName}/${tableName}/${action}`));
  }
  if (loading) {
    return /*#__PURE__*/React.createElement(Spin, {
      tip: "loading columns in PageWrapper"
    }, "Loading...");
  }
  return /*#__PURE__*/React.createElement(Provider, {
    value: pageInfo()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dm-page-v2"
  }, /*#__PURE__*/React.createElement(PageComponent, {
    dbName: dbName || '',
    tableName: tableName || '',
    action: action || '',
    tables: tables
  }), /*#__PURE__*/React.createElement(NavBar, null)));
};
export default PageWrapper;
//# sourceMappingURL=PageWrapper.js.map