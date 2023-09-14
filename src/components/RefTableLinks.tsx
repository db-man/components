// @ts-nocheck

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { Link } from 'react-router-dom';

import PageContext from '../contexts/page';
import { columnType } from './types';
import { useAppContext } from '../contexts/AppContext';

export default function RefTableLinks({ value, column }) {
  const { dbs } = useAppContext();
  const { dbName } = useContext(PageContext);
  // val can be "123" or ["123", "456"]
  let ids = value;
  if (!Array.isArray(value)) {
    ids = [value];
  }
  const refTablePrimaryKey = dbs[dbName]
    .find((db) => db.name === column.referenceTable)
    .columns.find((col) => col.primary).id;
  return (
    <span className='ref-table'>
      <List
        size='small'
        dataSource={ids}
        renderItem={(id) => (
          <List.Item>
            <Link
              to={`/${dbName}/${column.referenceTable}/get?${refTablePrimaryKey}=${id}`}
            >
              {id}
            </Link>
          </List.Item>
        )}
      />
    </span>
  );
}

RefTableLinks.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  column: columnType.isRequired,
};
