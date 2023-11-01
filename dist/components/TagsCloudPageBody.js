/* eslint-disable react/destructuring-assignment, no-console, max-len */

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import PageContext from '../contexts/page';
const TagsCloudPageBody = () => {
  const {
    githubDb,
    dbName,
    tableName
  } = useContext(PageContext);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  useEffect(() => {
    getDataAsync();
  }, []);
  const getDataAsync = async () => {
    try {
      setLoading(true);
      const contentAndSha = await githubDb.getTableRows(dbName, tableName);
      setLoading(false);
      setContent(contentAndSha.content);
    } catch (error) {
      setLoading(false);
      console.error('Failed to get JSON file in TagsCloudPageBody component, error:', error);
    }
  };
  const renderList = () => {
    if (!content) return null;

    // tag name <=> tag count
    const tagNameCount = {};
    content.forEach(item => {
      if (!item.tags) return;
      item.tags.forEach(name => {
        if (!tagNameCount[name]) {
          tagNameCount[name] = 0;
        }
        tagNameCount[name] += 1;
      });
    });
    const dataSource = Object.keys(tagNameCount).map(name => ({
      name,
      count: tagNameCount[name]
    })).sort((a, b) => b.count - a.count);
    return /*#__PURE__*/React.createElement(List, {
      loading: loading,
      grid: {
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 8,
        xxl: 3
      },
      dataSource: dataSource,
      renderItem: item => {
        const filter = encodeURIComponent(JSON.stringify({
          tags: item.name
        }));
        return /*#__PURE__*/React.createElement(List.Item, null, /*#__PURE__*/React.createElement("div", {
          className: "tags-cloud-item"
        }, /*#__PURE__*/React.createElement(Link, {
          to: {
            pathname: `/${dbName}/${tableName}/list`,
            search: `?filter=${filter}`
          }
        }, item.name), ' ', ": ", item.count));
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "tags-cloud-page-body-component"
  }, renderList());
};
export default TagsCloudPageBody;
//# sourceMappingURL=TagsCloudPageBody.js.map