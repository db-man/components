import React from 'react';
import PropTypes from 'prop-types';

import ListPageBody from './ListPageBody';

export default function ListPage(props) {
  const { tableName } = props;
  return (
    <div className="dm-list-page">
      <ListPageBody tableName={tableName} />
    </div>
  );
}

ListPage.propTypes = {
  tableName: PropTypes.string.isRequired,
};
