/* eslint-disable react/prop-types */

import React from 'react';

import DvPropTypes from './DvPropTypes';
import RandomPageBody from './RandomPageBody';

export default function RandomPage(props) {
  const {
    dbName, tableName, primaryKey, columns,
  } = props;
  return (
    <div className="random-page">

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
