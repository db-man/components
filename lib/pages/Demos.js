import React from 'react';
import { Collapse } from 'antd';
import { getColumnRender } from '../ddRender/ddRender';
const {
  Panel
} = Collapse;
const Demos = () => {
  const fn = getColumnRender('type:listPage', {
    id: 'photos',
    name: 'Photos',
    type: 'STRING_ARRAY',
    'type:createUpdatePage': ['MultiLineInputBox', 'WithPreview'],
    'type:listPage': ['ImageLink', '{"url":"{{record.photos.[0]}}","imgSrc":"{{record.photos.[0]}}"}'],
    'type:getPage': ['ImageLink', '{"url":"{{record.photos.[0]}}","imgSrc":"{{record.photos.[0]}}"}']
  });
  return /*#__PURE__*/React.createElement(Collapse, {
    defaultActiveKey: ['ImageLink']
  }, /*#__PURE__*/React.createElement(Panel, {
    header: "ImageLink",
    key: "ImageLink"
  }, fn('https://docs.mapbox.com/mapbox-gl-js/assets/cat.png', {
    id: 'foo',
    photos: ['https://docs.mapbox.com/mapbox-gl-js/assets/cat.png']
  })));
};
export default Demos;