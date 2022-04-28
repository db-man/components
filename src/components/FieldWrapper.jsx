import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { dbs } from '../dbs';
import RefTableLink from './RefTableLink';
import PageContext from '../contexts/page';

import { columnType } from './types';

// TODO When value is an array, how to render RefTableLink
export default function FieldWrapper(props) {
  const { dbName } = useContext(PageContext);
  const { column, value, children } = props;
  return (
    <div
      key={column.id}
      className="dm-form-field dm-string-form-field"
      data-debug={JSON.stringify(column)}
    >
      <div className="dm-field-label">
        <b>{column.name}</b>
        :
        {' '}
        {column.referenceTable && typeof value === 'string' && (
        <RefTableLink
          dbName={dbName}
          tables={dbs[dbName]}
          value={value}
          column={column}
        />
        )}
      </div>
      {children}
    </div>
  );
}

FieldWrapper.propTypes = {
  column: columnType.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.node,
};
FieldWrapper.defaultProps = {
  value: '',
  children: null,
};
// FieldWrapper.contextType = PageContext;