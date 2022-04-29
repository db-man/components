import React, { useContext } from 'react';

import PageContext from '../contexts/page';
import NavBar from './NavBar';
import CreatePageBody from './CreatePageBody';

export default function CreatePage() {
  const { dbName, tableName } = useContext(PageContext);

  return (
    <div className="dm-page">
      <h1>
        Create
        {' '}
        {dbName}
        {' '}
        {tableName}
      </h1>
      <CreatePageBody />
      <NavBar />
    </div>
  );
}
