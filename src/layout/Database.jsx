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

  return (
    <div>
      {!params.tableName && (
        <div>
          List of tables in DB:
          <TableList dbName={params.dbName} />
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Database;
