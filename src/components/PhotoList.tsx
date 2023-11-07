import React from "react";
import PropTypes from "prop-types";
import { List, Button } from "antd";

import { ImageLink } from "./Links";

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

// Copy from https://stackoverflow.com/questions/49474775/chrome-65-blocks-cross-origin-a-download-client-side-workaround-to-force-down
const downloadImage = (imgUrl: string) => {
  function forceDownload(blob: string, filename: string) {
    var a = document.createElement("a");
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  // Current blob size limit is around 500MB for browsers
  function downloadResource(url: string, filename: string) {
    if (!filename) {
      // Try to get the last part of URL as the filename
      // for example `353339.jpg` from `https://img.com/a/b/c/353339.jpg`
      filename = url.split("\\").pop()?.split("/").pop() || "";
    }
    fetch(url, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, filename);
      })
      .catch((e) => console.error("downloadImage() failed to fetch", e));
  }
  downloadResource(imgUrl, "");
};

const renderItem = (item: PhotoType) => (
  <List.Item>
    <ImageLink
      url={item.url}
      imgSrc={item.imgSrc}
      description={item.description}
    />
    <Button
      onClick={() => {
        downloadImage(item.url);
      }}
    >
      Download
    </Button>
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
      .join(",");
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
