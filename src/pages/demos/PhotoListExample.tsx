import React from 'react';

import PhotoList from '../../components/PhotoList';

const PhotoListExample = () => {
  return (
    <div>
      <PhotoList
        photos={[
          {
            url: 'https://img.alicdn.com/imgextra/i4/2215303353339/O1CN01VY1jcw1aXJL8LNRKa_!!2215303353339.jpg',
            imgSrc:
              'https://img.alicdn.com/imgextra/i4/2215303353339/O1CN01VY1jcw1aXJL8LNRKa_!!2215303353339.jpg',
            description: 'Image 1',
          },
          {
            url: 'https://img.alicdn.com/imgextra/i1/2331926889/O1CN01vZChZl20lDMs1t8rC_!!2331926889.jpg',
            imgSrc:
              'https://img.alicdn.com/imgextra/i1/2331926889/O1CN01vZChZl20lDMs1t8rC_!!2331926889.jpg',
            description: 'Image 2',
          },
          {
            url: 'https://img.alicdn.com/imgextra/i3/2215580087668/O1CN011Cqzdd26Vzqqnj1bT_!!2215580087668.jpg',
            imgSrc:
              'https://img.alicdn.com/imgextra/i3/2215580087668/O1CN011Cqzdd26Vzqqnj1bT_!!2215580087668.jpg',
            description: 'Image 3',
          },
        ]}
      />
    </div>
  );
};

export default PhotoListExample;
