import React from 'react';
import DbConnections from '../components/DbConnections';
import useTitle from '../hooks/useTitle';

/**
 * To save online db tables schema in the local db, then pages could load faster
 */
const Settings = () => {
  useTitle('Settings - db-man');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Settings"), /*#__PURE__*/React.createElement(DbConnections, {
    storage: {
      set: (k, v) => window.localStorage.setItem(k, v),
      get: k => window.localStorage.getItem(k)
    }
  }));
};
export default Settings;