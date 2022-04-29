/* eslint-disable react/prop-types, react/destructuring-assignment, max-len, no-console, react/no-unused-class-component-methods */

import React from 'react';
import { Link } from 'react-router-dom';
import { message, Spin } from 'antd';
import { githubDb } from '@db-man/github';
import { utils } from 'db-man';

import { dbs } from '../dbs';
import * as constants from '../constants';
import PageContext from '../contexts/page';
import CreatePage from '../components/CreatePage';
import UpdatePage from '../components/UpdatePage';
import ListPage from '../components/ListPage';
import RandomPage from '../components/RandomPage';
import TagsCloudPage from '../components/TagsCloudPage';
import GetPage from '../components/GetPage';

const { Provider } = PageContext;

const mapp = {
  list: ListPage,
  random: RandomPage,
  create: CreatePage,
  update: UpdatePage,
  get: GetPage,
  tagsCloud: TagsCloudPage,
};

export function TableList({ dbName }) {
  if (!dbs) return null;
  const tablesOfSelectedDb = dbs[dbName];
  return (
    <div>
      {tablesOfSelectedDb.map(({ name: tName }) => (
        <li key={tName}>
          <Link to={`/${dbName}/${tName}`}>{tName}</Link>
        </li>
      ))}
    </div>
  );
}

export function ActionList({ dbName, tableName }) {
  return (
    <div>
      List of actions in table:
      {['list', 'create'].map((action) => (
        <li key={action}>
          <Link to={`/${dbName}/${tableName}/${action}`}>{action}</Link>
        </li>
      ))}
    </div>
  );
}

/**
 * To render list/create/update page for `/db_name/table_name.json`
 */
export default class PageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tables is got from db repo db_name/columns.json which contain all tables column definition in current database
      tables: [],
      loading: false,
    };
  }

  componentDidMount() {
    // TODO we could get online and offline at the same time
    // then we only use offline data to render
    // then we compare the offline data with online data, if there is any diff, we show alert
    const onlineEnabled = false;
    if (onlineEnabled) {
      this.getOnlineData();
    } else {
      this.getOfflineData();
    }

    const { action, tableName } = this.context;
    document.title = `${action} ${tableName}`;
  }

  get columns() {
    const tablesOfSelectedDb = dbs[this.props.dbName];
    return tablesOfSelectedDb.find(
      (table) => table.name === this.props.tableName,
    ).columns;
  }

  get pageInfo() {
    const { dbName, tableName, action } = this.props;
    const { columns } = dbs[dbName].find(
      (table) => table.name === tableName,
    );
    return {
      dbs,
      dbName,
      tableName,
      action,
      columns,
      primaryKey: utils.getPrimaryKey(this.columns),
      tables: dbs[dbName],
    };
  }

  getOnlineData = async () => {
    try {
      this.setState({ loading: true });
      const tables = await githubDb.getDbTablesSchemaAsync(this.props.dbName);
      console.debug('use online columns', tables);
      this.setState({
        tables,
      });
    } catch (error) {
      console.error(
        'Failed to get column JSON file in List component, error:',
        error,
      );
      message.error('Failed to get online columns definition!');
    }
    this.setState({ loading: false });
  };

  getOfflineData = () => {
    const tables = JSON.parse(
      localStorage.getItem(constants.LS_KEY_DBS_SCHEMA),
    )[this.props.dbName];
    this.setState({
      tables,
    });
  };

  renderTableListInDb = () => (
    <div>
      List of tables in DB:
      <TableList dbName={this.props.dbName} />
    </div>
  );

  renderActionInTable = () => (
    <ActionList dbName={this.props.dbName} tableName={this.props.tableName} />
  );

  render() {
    const { dbName, tableName, action } = this.props;
    const { loading, tables } = this.state;

    // if (!tableName) {
    //   return this.renderTableListInDb();
    // }

    // if (!action) {
    //   return this.renderActionInTable();
    // }

    const PageComponent = mapp[action];

    if (!PageComponent) {
      return (
        <div>
          <div>404 - PageComponent Not Found</div>
          <div>{`/${dbName}/${tableName}/${action}`}</div>
        </div>
      );
    }

    if (loading) {
      return <Spin tip="loading columns in PageWrapper" />;
    }

    if (this.columns.length === 0) {
      return 'No columns found for this table!';
    }

    const primaryKey = utils.getPrimaryKey(this.columns);
    return (
      <Provider value={this.pageInfo}>
        <div className="dm-page-v2">
          {/* Pass tableName down, so child component to rerender according to this props */}
          <PageComponent
            dbName={dbName}
            tableName={tableName}
            action={action}
            columns={this.columns}
            primaryKey={primaryKey}
            tables={tables}
          />
        </div>
      </Provider>
    );
  }
}