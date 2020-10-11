import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'common/ssr/Routes';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import {
  routerPrefix,
} from 'common/config';

const Main = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <BrowserRouter basename={routerPrefix}>
      {renderRoutes(Routes)}
    </BrowserRouter>
  );
};

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <Main />,
  document.getElementById('page_main'),
);
