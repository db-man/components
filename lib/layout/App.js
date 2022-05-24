import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Settings from '../pages/Settings';
import AppLayout from './AppLayout'; // import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import './App.css';

export default function App() {
  return /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(Settings, null, /*#__PURE__*/React.createElement(AppLayout, null)));
}