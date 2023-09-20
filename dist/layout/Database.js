// @ts-nocheck

import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { TableList } from './PageWrapper';
import { useAppContext } from '../contexts/AppContext';
function Database() {
  const params = useParams();
  const {
    dbs
  } = useAppContext();
  if (!dbs) return /*#__PURE__*/React.createElement("div", null, "Failed to get dbs from localStorage");
  const selectedDb = dbs[params.dbName];
  if (!selectedDb) return /*#__PURE__*/React.createElement("div", null, "db not found");
  return /*#__PURE__*/React.createElement("div", null, !params.tableName && /*#__PURE__*/React.createElement("div", null, "List of tables in DB:", /*#__PURE__*/React.createElement(TableList, {
    dbName: params.dbName
  })), /*#__PURE__*/React.createElement(Outlet, null));
}
export default Database;
//# sourceMappingURL=Database.js.map