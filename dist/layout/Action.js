import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from './PageWrapper';
function Action() {
  const params = useParams();
  if (!params.dbName) return /*#__PURE__*/React.createElement("div", null, "db name is required");
  if (!params.tableName) return /*#__PURE__*/React.createElement("div", null, "table name is required");
  if (!params.action) return /*#__PURE__*/React.createElement("div", null, "action is required");
  return /*#__PURE__*/React.createElement(PageWrapper, {
    dbName: params.dbName,
    tableName: params.tableName,
    action: params.action
  });
}
export default Action;
//# sourceMappingURL=Action.js.map