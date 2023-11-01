import React from 'react';
import { DbConnections, constants } from '../lib';
const SettingsExample = () => {
  const dbSchema = JSON.parse(localStorage.getItem(constants.LS_KEY_DBS_SCHEMA) || '{}');
  if (dbSchema) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "App will use this DB schema to render features."), /*#__PURE__*/React.createElement("pre", {
      style: {
        fontSize: 10
      }
    }, JSON.stringify(dbSchema, null, 2)));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'red'
    }
  }, "No DB schema found, please create one."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DbConnections, {
    storage: {
      set: (k, v) => window.localStorage.setItem(k, v),
      get: k => window.localStorage.getItem(k)
    }
  })));
};
export default SettingsExample;
//# sourceMappingURL=DbConnectionsExample.js.map