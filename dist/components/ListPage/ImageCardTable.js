import React, { useContext } from 'react';
import { Alert, Card, Empty, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { ImageLink } from '../Links';
import PageContext from '../../contexts/page';
const gridStyle = {
  width: '25%',
  textAlign: 'center'
};
const ImageCardTable = ({
  imgKey,
  dataSource,
  pagination,
  onChange
}) => {
  const {
    dbName,
    tableName,
    primaryKey
  } = useContext(PageContext);
  if (!imgKey) {
    return /*#__PURE__*/React.createElement(Alert, {
      message: "Error",
      description: /*#__PURE__*/React.createElement("div", null, "Which column data to render the image list? Please define only one column with ", /*#__PURE__*/React.createElement("code", null, "isListPageImageViewKey: true")),
      type: "error",
      showIcon: true
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "dm-card-table"
  }, /*#__PURE__*/React.createElement(Card, null, dataSource.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize).map((item, index) => {
    let el = null;
    switch (typeof item[imgKey]) {
      case 'undefined':
        el = /*#__PURE__*/React.createElement(Empty, null);
        break;
      case 'string':
        el = /*#__PURE__*/React.createElement(ImageLink, {
          imgSrc: item[imgKey],
          url: item[imgKey]
        });
        break;
      case 'object':
        if (item[imgKey]?.length === 0) return /*#__PURE__*/React.createElement(Alert, {
          message: "Error",
          description: "Empty image list",
          type: "error",
          showIcon: true
        });
        el = /*#__PURE__*/React.createElement(React.Fragment, null, item[imgKey].map(url => /*#__PURE__*/React.createElement(ImageLink, {
          key: url,
          imgSrc: url,
          url: url
        })));
        break;
      default:
        return /*#__PURE__*/React.createElement(Alert, {
          message: "Error",
          description: `The value of ${imgKey} is not a string or an array, but a ${typeof item[imgKey]} type, cannot render image list!`,
          type: "error",
          showIcon: true
        });
    }
    return /*#__PURE__*/React.createElement(Card.Grid, {
      key: index,
      style: gridStyle
    }, el, /*#__PURE__*/React.createElement(Link, {
      to: {
        pathname: `/${dbName}/${tableName}/update`,
        search: `?${primaryKey}=${item[primaryKey]}`
      }
    }, "Update"));
  })), /*#__PURE__*/React.createElement(Pagination, {
    current: pagination.current,
    pageSize: pagination.pageSize,
    total: dataSource.length,
    pageSizeOptions: [4 * 3, 4 * 6, 4 * 10, 4 * 20],
    onChange: (current, pageSize) => {
      onChange({
        current,
        pageSize
      });
    }
  }));
};
export default ImageCardTable;
//# sourceMappingURL=ImageCardTable.js.map