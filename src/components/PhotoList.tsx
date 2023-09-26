import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

import { ImageLink } from './Links';

const listGrid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
  xxl: 3,
};

export type PhotoType = {
  url: string;
  imgSrc: string;
  description: string;
};

const renderItem = (item: PhotoType) => (
  <List.Item>
    <ImageLink
      url={item.url}
      imgSrc={item.imgSrc}
      description={item.description}
    />
  </List.Item>
);

const PhotoList = ({ photos }: { photos: PhotoType[] }) => {
  const renderDup = () => {
    const photoMap: {
      [key: string]: number;
    } = {};
    photos.forEach((photo) => {
      if (photoMap[photo.url] === undefined) {
        photoMap[photo.url] = 0;
      } else {
        photoMap[photo.url] += 1;
      }
    });
    return Object.keys(photoMap)
      .filter((key) => photoMap[key] > 1)
      .map((key) => photoMap[key])
      .join(',');
  };

  return (
    <div>
      {renderDup()}
      <List grid={listGrid} dataSource={photos} renderItem={renderItem} />
    </div>
  );
};

PhotoList.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
};

PhotoList.defaultProps = { photos: [] };

export default PhotoList;
