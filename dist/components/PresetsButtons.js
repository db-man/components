import React from 'react';
import { Button } from 'antd';
import { COL_UI_PRESETS } from '../constants';
const PresetsButtons = ({
  column,
  onChange
}) => /*#__PURE__*/React.createElement(React.Fragment, null, (column[COL_UI_PRESETS] || []).map(opt => /*#__PURE__*/React.createElement("span", {
  key: opt
}, /*#__PURE__*/React.createElement(Button, {
  size: "small",
  onClick: event => {
    onChange(opt, event);
  }
}, opt), ' ')));
export default PresetsButtons;
//# sourceMappingURL=PresetsButtons.js.map