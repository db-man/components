import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { columnType } from './types';
import StringFormFieldValue from './StringFormFieldValue';
import RefTableLink from './RefTableLink';
import PageContext from '../contexts/page';
import { dbs } from '../dbs';

export default function StringFormField(props) {
  const {
    label, column, value, inputProps, preview, onChange,
  } = props;
  const { dbName } = useContext(PageContext);
  return (
    <div className="dm-form-field dm-string-form-field">
      <b>{label}</b>
      :
      {' '}
      <RefTableLink
        column={column}
        tables={dbs[dbName]}
        dbName={dbName}
        value={value}
      />
      <StringFormFieldValue
        inputProps={inputProps}
        size="small"
        preview={preview}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

StringFormField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  preview: PropTypes.bool,
  column: columnType.isRequired,
  inputProps: PropTypes.shape({
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onKeyDown: PropTypes.func,
  }),
  onChange: PropTypes.func.isRequired,
};

StringFormField.defaultProps = {
  preview: false,
  // Props to pass directly to antd's Input component
  inputProps: {
    // disabled
    // autoFocus
    // onKeyDown
  },
};
