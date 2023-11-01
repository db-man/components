import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from './PageWrapper';
function IframePageWrapper() {
  const {
    dbName,
    tableName,
    action
  } = useParams();
  if (!dbName) return /*#__PURE__*/React.createElement("div", null, "db name is required");
  if (!tableName) return /*#__PURE__*/React.createElement("div", null, "table name is required");
  if (!action) return /*#__PURE__*/React.createElement("div", null, "action is required");
  return /*#__PURE__*/React.createElement(PageWrapper, {
    dbName: dbName,
    tableName: tableName,
    action: action
  });
}
export default IframePageWrapper;
//# sourceMappingURL=IframePageWrapper.js.map