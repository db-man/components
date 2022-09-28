import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { TableList } from './PageWrapper';
import { getDbs } from '../dbs';

function Database() {
  const params = useParams();
  const dbs = getDbs();
  if (!dbs) return 'Failed to get dbs from localStorage';
  const selectedDb = dbs[params.dbName];
  if (!selectedDb) return 'db not found';
  return /*#__PURE__*/React.createElement("div", null, !params.tableName && /*#__PURE__*/React.createElement("div", null, "List of tables in DB:", /*#__PURE__*/React.createElement(TableList, {
    dbName: params.dbName
  })), /*#__PURE__*/React.createElement(Outlet, null));
}

export default Database;