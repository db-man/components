import React from 'react';
import PropTypes from 'prop-types';
import {
  Routes, Route, Outlet, useParams,
} from 'react-router-dom';
import { Layout } from 'antd';

import AppContext from '../contexts/app';
import IframePageWrapper from './IframePageWrapper';
import Database from './Database';
import Table from './Table';
import Action from './Action';
import BreadcrumbWrapper from './BreadcrumbWrapper';
import Settings from '../pages/Settings';
import LeftSideMenu from '../components/LeftSideMenu';
import PageHeaderContent from '../components/PageHeaderContent';

const { Header, Content, Sider } = Layout;
const { Provider } = AppContext;

function PageLayout() {
  const { dbName, tableName, action } = useParams();
  return (
    <Layout>
      <Header className="header" style={{ height: '30px', lineHeight: '30px' }}>
        <PageHeaderContent />
      </Header>
      <Layout>
        <Sider width={140} className="site-layout-background">
          {dbName ? (
            <LeftSideMenu
              dbName={dbName}
              tableName={tableName}
              action={action}
            />
          ) : null}
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <BreadcrumbWrapper
            dbName={dbName}
            tableName={tableName}
            action={action}
          />
          <Content
            className="site-layout-background"
            style={{
              // padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default function AppLayout({ modes }) {
  return (
    <Provider value={{ modes }}>
      <Routes>
        <Route
          path="/iframe/:dbName/:tableName/:action"
          element={<IframePageWrapper />}
        />
        <Route path="/" element={<PageLayout />}>
          <Route path="settings" element={<Settings />} />
          <Route path=":dbName" element={<Database />}>
            <Route path=":tableName" element={<Table />}>
              <Route path=":action" element={<Action />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

AppLayout.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
