import React from 'react';
import App from '../layout/App';
import DbConnectionsExample from './DbConnectionsExample';

import './index.css';

export default function Example() {
  const urlParams = new URLSearchParams(window.location.search);
  const example = urlParams.get('example');
  const mmap = {
    app: App,
    dbconnections: DbConnectionsExample,
  };
  const Comp = mmap[example];
  if (!Comp) {
    return 'Put "?example=app" in the URL';
  }
  return <Comp />;
}
