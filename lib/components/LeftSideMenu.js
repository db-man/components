function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { dbs } from '../dbs';
export default class LeftSideMenu extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleOpenChange", openKeys => {
      this.setState({
        openKeys
      });
    });
    this.state = {
      openKeys: []
    };
  }
  render() {
    if (!dbs) {
      return null;
    }
    const {
      dbName,
      tableName,
      action
    } = this.props;
    const tablesOfSelectedDb = dbs[dbName];
    if (!tablesOfSelectedDb) {
      return null;
    }
    const firstTableOfSelectedDb = tablesOfSelectedDb[0];
    const selectedKeys = [`${dbName}-${tableName}-${action}`];
    let openKeys = [firstTableOfSelectedDb.name];
    if (tableName) {
      openKeys = [tableName];
    }
    const {
      openKeys: openKeys2
    } = this.state;
    if (openKeys2.length > 0) {
      openKeys = openKeys2;
    }
    return /*#__PURE__*/React.createElement(Menu, {
      mode: "inline",
      selectedKeys: selectedKeys,
      openKeys: openKeys,
      style: {
        height: '100%',
        borderRight: 0
      },
      onOpenChange: this.handleOpenChange,
      items: tablesOfSelectedDb.map(({
        name: tName
      }) => ({
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
  }
}
LeftSideMenu.propTypes = {
  dbName: PropTypes.string.isRequired,
  tableName: PropTypes.string,
  action: PropTypes.string
};
LeftSideMenu.defaultProps = {
  tableName: '',
  action: ''
};