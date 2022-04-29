import React, { useContext } from 'react';

import PageContext from '../contexts/page';
import NavBar from './NavBar';
import UpdatePageBody from './UpdatePageBody';

export default function UpdatePage() {
  const { dbName, tableName } = useContext(PageContext);
  return (
    <div className="dm-page">
      <h1>
        <a href={window.location.href}>
          Update
          {' '}
          {dbName}
          {' '}
          {tableName}
        </a>
      </h1>
      <UpdatePageBody />
      <NavBar />
    </div>
  );
}
