import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { TableList } from './PageWrapper';

function Database() {
  const params = useParams();

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
