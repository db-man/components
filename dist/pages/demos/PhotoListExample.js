import React from 'react';
import PhotoList from '../../components/PhotoList';
import { getColumnRender } from '../../ddRender/ddRender';
import renderFuncTpl from './renderFuncTpl.json';
const PhotoListExample = () => {
  // To render the 'photo' column on a GetPage using 'PhotoList' component
  const getPageRenderFn = getColumnRender('type:getPage', {
    id: 'photos',
    name: 'Photos',
    type: 'STRING_ARRAY',
    // 'type:createUpdatePage': ['MultiLineInputBox', 'WithPreview'],
    // 'type:listPage': [
    //   'ImageLink',
    //   '{"url":"{{record.photos.[0]}}","imgSrc":"{{record.photos.[0]}}"}',
    // ],
    'type:getPage': ['PhotoList', renderFuncTpl]
  });
  const record = {
    id: 'foo',
    photos: ['https://img.alicdn.com/imgextra/i4/2215303353339/O1CN01VY1jcw1aXJL8LNRKa_!!2215303353339.jpg']
  };
  const value = record.photos;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Render from ddRender (failed):"), getColumnRender('type:getPage', {
    id: 'photos',
    name: 'Photos',
    type: 'STRING_ARRAY',
    'type:getPage': ['PhotoList', '["PhotoList","]']
  })(value, record), /*#__PURE__*/React.createElement("h1", null, "Render from ddRender:"), getPageRenderFn(value, record), /*#__PURE__*/React.createElement("h1", null, "Render from component:"), /*#__PURE__*/React.createElement(PhotoList, {
    photos: [{
      url: 'https://img.alicdn.com/imgextra/i4/2215303353339/O1CN01VY1jcw1aXJL8LNRKa_!!2215303353339.jpg',
      imgSrc: 'https://img.alicdn.com/imgextra/i4/2215303353339/O1CN01VY1jcw1aXJL8LNRKa_!!2215303353339.jpg',
      description: 'Image 1'
    }, {
      url: 'https://img.alicdn.com/imgextra/i1/2331926889/O1CN01vZChZl20lDMs1t8rC_!!2331926889.jpg',
      imgSrc: 'https://img.alicdn.com/imgextra/i1/2331926889/O1CN01vZChZl20lDMs1t8rC_!!2331926889.jpg',
      description: 'Image 2'
    }, {
      url: 'https://img.alicdn.com/imgextra/i3/2215580087668/O1CN011Cqzdd26Vzqqnj1bT_!!2215580087668.jpg',
      imgSrc: 'https://img.alicdn.com/imgextra/i3/2215580087668/O1CN011Cqzdd26Vzqqnj1bT_!!2215580087668.jpg',
      description: 'Image 3'
    }]
  }));
};
export default PhotoListExample;
//# sourceMappingURL=PhotoListExample.js.map