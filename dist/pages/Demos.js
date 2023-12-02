import React from 'react';
import { Collapse } from 'antd';
import PhotoListExample from './demos/PhotoListExample';
import ImageLinkExample from './demos/ImageLinkExample';
const {
  Panel
} = Collapse;
const Demos = () => {
  return /*#__PURE__*/React.createElement(Collapse, {
    defaultActiveKey: ['PhotoList']
  }, /*#__PURE__*/React.createElement(Panel, {
    header: "ImageLink",
    key: "ImageLink"
  }, /*#__PURE__*/React.createElement(ImageLinkExample, null)), /*#__PURE__*/React.createElement(Panel, {
    header: "PhotoList",
    key: "PhotoList"
  }, /*#__PURE__*/React.createElement(PhotoListExample, null)));
};
export default Demos;
//# sourceMappingURL=Demos.js.map