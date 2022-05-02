/* eslint-disable react/prop-types */

import React from 'react';

import DvPropTypes from './DvPropTypes';
import TagsCloudPageBody from './TagsCloudPageBody';

export default function TagsCloudPage(props) {
  const {
    dbName, tableName, primaryKey, columns,
  } = props;
  return (
    <div className="tags-cloud-page">
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
