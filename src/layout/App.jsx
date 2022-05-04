import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

import Settings from '../pages/Settings';
import AppLayout from './AppLayout';

// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import './App.css';

export default function App({ modes }) {
  return (
    <BrowserRouter>
      <Settings>
        <AppLayout modes={modes} />
      </Settings>
    </BrowserRouter>
  );
}

App.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string),
};

App.defaultProps = {
  modes: [],
};
