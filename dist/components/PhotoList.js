import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, message } from 'antd';
import { ImageLink } from './Links';
import { downloadImage } from '../utils';
const listGrid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
  xxl: 3
};
const renderItem = item => /*#__PURE__*/React.createElement(List.Item, null, /*#__PURE__*/React.createElement(ImageLink, {
  url: item.url,
  imgSrc: item.imgSrc,
  description: item.description
}));
const PhotoList = ({
  photos
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const renderDup = () => {
    const photoMap = {};
    photos.forEach(photo => {
      if (photoMap[photo.url] === undefined) {
        photoMap[photo.url] = 0;
      } else {
        photoMap[photo.url] += 1;
      }
    });
    return Object.keys(photoMap).filter(key => photoMap[key] > 1).map(key => photoMap[key]).join(',');
  };

  // Download photos every 1s
  const downloadAll = photoUrls => {
    let index = 0;
    function download() {
      if (index < photoUrls.length) {
        downloadImage(photoUrls[index]);
        messageApi.info('Download ' + photoUrls[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }

    // Run download every 1s
    const intervalId = window.setInterval(download, 1000);
  };
  return /*#__PURE__*/React.createElement("div", null, contextHolder, renderDup(), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      downloadAll(photos.map(p => p.url));
    }
  }, "Download All"), /*#__PURE__*/React.createElement(List, {
    grid: listGrid,
    dataSource: photos,
    renderItem: renderItem
  }));
};
PhotoList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    description: PropTypes.string
  }))
};
PhotoList.defaultProps = {
  photos: []
};
export default PhotoList;
//# sourceMappingURL=PhotoList.js.map