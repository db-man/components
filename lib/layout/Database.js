import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { TableList } from './PageWrapper';

function Database() {
  const params = useParams();
  return /*#__PURE__*/React.createElement("div", null, !params.tableName && /*#__PURE__*/React.createElement("div", null, "List of tables in DB:", /*#__PURE__*/React.createElement(TableList, {
    dbName: params.dbName
  })), /*#__PURE__*/React.createElement(Outlet, null));
}

export default Database;