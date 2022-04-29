/* eslint-disable react/prop-types */

import React from 'react';

import DvPropTypes from './DvPropTypes';
import NavBar from './NavBar';
import RandomPageBody from './RandomPageBody';

export default function RandomPage(props) {
  const {
    dbName, tableName, tables, primaryKey, columns,
  } = props;
  return (
    <div className="random-page">
      <NavBar
        dbName={dbName}
        tableName={tableName}
        tables={tables}
      />
      <RandomPageBody
        primaryKey={primaryKey}
        columns={columns}
        dbName={dbName}
        tableName={tableName}
      />
    </div>
  );
}

RandomPage.propTypes = {
  columns: DvPropTypes.columns.isRequired,
};
