/* eslint-disable react/prop-types */

import React from 'react';

// import { DvPropTypes, NavBar } from '@db-man/components';
import DvPropTypes from './DvPropTypes';
import NavBar from './NavBar';
import TagsCloudPageBody from './TagsCloudPageBody';

export default function TagsCloudPage(props) {
  const {
    dbName, tableName, tables, primaryKey, columns,
  } = props;
  return (
    <div className="tags-cloud-page">
      <NavBar
        dbName={dbName}
        tableName={tableName}
        tables={tables}
      />
      <TagsCloudPageBody
        primaryKey={primaryKey}
        columns={columns}
        dbName={dbName}
        tableName={tableName}
      />
    </div>
  );
}

TagsCloudPage.propTypes = {
  columns: DvPropTypes.columns.isRequired,
};
