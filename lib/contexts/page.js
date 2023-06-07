import React from 'react';

// Store all page info, include db, table, and columns
// Setter: src/App/components/PageWrapper.jsx
const PageContext = /*#__PURE__*/React.createContext({
  appModes: [],
  // all app modes: 'split-table'
  dbName: '',
  tableName: '',
  action: '',
  columns: [],
  primaryKey: '',
  // primary key of current db table
  tables: []
});
export default PageContext;