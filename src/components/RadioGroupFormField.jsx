import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import { columnType } from './types';

function RadioGroup(props) {
  const {
    label, value, disabled, column, onChange,
  } = props;
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="dm-form-field dm-string-form-field">
      <b>{label}</b>
      :
      {' '}
      <Radio.Group
        onChange={handleChange}
        value={value}
        disabled={disabled}
        defaultValue={column.enum[0]}
      >
        {column.enum.map((r) => (
          <Radio key={r} value={r}>
            {r}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
}

export default RadioGroup;

RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
  column: columnType.isRequired,
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  onChange: () => {},
};
