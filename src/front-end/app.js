import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'react-root/Routes';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import {
  routerPrefix,
} from 'common/config';

const Router = process.env.reactSsrMode ? BrowserRouter : HashRouter;

const Main = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Router basename={routerPrefix}>
      {renderRoutes(Routes)}
    </Router>
  );
};

// const renderMethod = module.hot && !process.env.reactSsrMode ? ReactDOM.render : ReactDOM.hydrate;
const renderMethod = process.env.reactSsrMode ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(
  <Main />,
  document.getElementById('page_main'),
);
