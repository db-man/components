import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppContext } from '../contexts/AppContext';
const LeftSideMenu = ({
  dbName,
  tableName,
  action
}) => {
  const {
    dbs
  } = useAppContext();
  const [openKeys, setOpenKeys] = useState([]);
  const handleOpenChange = keys => {
    setOpenKeys(keys);
  };
  if (!dbs) {
    return null;
  }
  const tablesOfSelectedDb = dbs[dbName];
  if (!tablesOfSelectedDb) {
    return null;
  }
  const firstTableOfSelectedDb = tablesOfSelectedDb[0];
  const selectedKeys = [`${dbName}-${tableName}-${action}`];
  let openKeys3 = [firstTableOfSelectedDb.name];
  if (tableName) {
    openKeys3 = [tableName];
  }
  if (openKeys.length > 0) {
    openKeys3 = openKeys;
  }
  return /*#__PURE__*/React.createElement(Menu, {
    mode: "inline",
    selectedKeys: selectedKeys,
    openKeys: openKeys3,
    style: {
      height: '100%',
      borderRight: 0
    },
    onOpenChange: handleOpenChange,
    items: tablesOfSelectedDb.map(({
      name: tName
    }) => ({
      key: tName,
      label: tName,
      icon: /*#__PURE__*/React.createElement(UserOutlined, null),
      children: [{
        key: `${dbName}-${tName}-list`,
        label: /*#__PURE__*/React.createElement(Link, {
          to: `/${dbName}/${tName}/list`
        }, "List")
      }, {
        key: `${dbName}-${tName}-create`,
        label: /*#__PURE__*/React.createElement(Link, {
          to: `/${dbName}/${tName}/create`
        }, "Create")
      }, {
        key: `${dbName}-${tName}-random`,
        label: /*#__PURE__*/React.createElement(Link, {
          to: `/${dbName}/${tName}/random`
        }, "Random")
      }, {
        key: `${dbName}-${tName}-tagsCloud`,
        label: /*#__PURE__*/React.createElement(Link, {
          to: `/${dbName}/${tName}/tagsCloud`
        }, "tagsCloud")
      }, {
        key: `${dbName}-${tName}-tableConfig`,
        label: /*#__PURE__*/React.createElement(Link, {
          to: `/${dbName}/${tName}/tableConfig`
        }, "tableConfig")
      }, {
        key: `${dbName}-${tName}-query`,
        label: /*#__PURE__*/React.createElement(Link, {
          to: `/${dbName}/${tName}/query`
        }, "Query")
      }]
    }))
  });
};
LeftSideMenu.propTypes = {
  dbName: PropTypes.string.isRequired,
  tableName: PropTypes.string,
  action: PropTypes.string
};
LeftSideMenu.defaultProps = {
  tableName: '',
  action: ''
};
export default LeftSideMenu;
//# sourceMappingURL=LeftSideMenu.js.map