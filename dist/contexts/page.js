import React from 'react';
// Store all page info, include db, table, and columns
// Setter: src/layout/PageWrapper.tsx
const PageContext = /*#__PURE__*/React.createContext({
  appModes: [],
  // all app modes: 'split-table'
  dbs: {},
  // all dbs
  dbName: '',
  tableName: '',
  action: '',
  columns: [],
  primaryKey: '',
  // primary key of current db table
  tables: [],
  githubDb: null // GitHubDb from @db-man/github
});

export default PageContext;
//# sourceMappingURL=page.js.map