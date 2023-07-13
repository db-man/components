// @ts-nocheck

import React from 'react';
import { Button } from 'antd';
import { COL_UI_PRESETS } from '../constants';

const PresetsButtons = ({ column, onChange }) => (
  (column[COL_UI_PRESETS] || []).map((opt) => (
    <span key={opt}>
      <Button
        size="small"
        onClick={(event) => {
          onChange(opt, event);
        }}
      >
        {opt}
      </Button>{' '}
    </span>
  ))
);

export default PresetsButtons;
