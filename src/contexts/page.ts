import React from 'react';

import Column from '../types/Column';

interface PageContextType {
  appModes: string[];
  dbName: string;
  tableName: string;
  action: string;
  columns: Column[];
  primaryKey: string;
  tables: string[];
  githubDb: any;
}

// Store all page info, include db, table, and columns
// Setter: src/App/components/PageWrapper.jsx
const PageContext = React.createContext<PageContextType>({
  appModes: [], // all app modes: 'split-table'
  dbName: '',
  tableName: '',
  action: '',
  columns: [],
  primaryKey: '', // primary key of current db table
  tables: [],
  githubDb: null, // GitHubDb from @db-man/github
});

export default PageContext;
