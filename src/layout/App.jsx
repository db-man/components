import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Settings from '../pages/Settings';
import AppLayout from './AppLayout';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Settings>
        <AppLayout />
      </Settings>
    </BrowserRouter>
  );
}
