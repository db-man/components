import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { dbs } from '../dbs';

const { SubMenu } = Menu;

export default class LeftSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
    };
  }

  handleOpenChange = (openKeys) => {
    this.setState({ openKeys });
  };

  render() {
    if (!dbs) {
      return null;
    }

    const { dbName, tableName, action } = this.props;
    const tablesOfSelectedDb = dbs[dbName];
    const firstTableOfSelectedDb = tablesOfSelectedDb[0];

    const selectedKeys = [`${dbName}-${tableName}-${action}`];
    let openKeys = [firstTableOfSelectedDb.name];
    if (tableName) {
      openKeys = [tableName];
    }
    const { openKeys: openKeys2 } = this.state;
    if (openKeys2.length > 0) {
      openKeys = openKeys2;
    }

    return (
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        style={{ height: '100%', borderRight: 0 }}
        onOpenChange={this.handleOpenChange}
      >
        {tablesOfSelectedDb.map(({ name: tName }) => (
          <SubMenu key={tName} icon={<UserOutlined />} title={tName}>
            <Menu.Item key={`${dbName}-${tName}-list`}>
              <Link to={`/${dbName}/${tName}/list`}>List</Link>
            </Menu.Item>
            <Menu.Item key={`${dbName}-${tName}-create`}>
              <Link to={`/${dbName}/${tName}/create`}>Create</Link>
            </Menu.Item>
            <Menu.Item key={`${dbName}-${tName}-random`}>
              <Link to={`/${dbName}/${tName}/random`}>random</Link>
            </Menu.Item>
            <Menu.Item key={`${dbName}-${tName}-tagsCloud`}>
              <Link to={`/${dbName}/${tName}/tagsCloud`}>tagsCloud</Link>
            </Menu.Item>
            {/* <Menu.Item key={`${dbName}-${tName}-update`}>
            <Link to={`/${dbName}/${tName}/update`}>
              Update
            </Link>
          </Menu.Item> */}
          </SubMenu>
        ))}
      </Menu>
    );
  }
}

LeftSideMenu.propTypes = {
  dbName: PropTypes.string.isRequired,
  tableName: PropTypes.string,
  action: PropTypes.string,
};

LeftSideMenu.defaultProps = {
  tableName: '',
  action: '',
};
