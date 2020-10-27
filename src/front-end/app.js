import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Routes from 'react-root/Routes';
import axios from 'axios';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import preloadedStateContext, { injectionKey } from 'common/react/az-preloaded-state-context';

import {
  routerPrefix,
} from 'common/config';

import { loadState, saveState, removeState } from './localStorage';

const Router = process.env.reactSsrMode ? BrowserRouter : HashRouter;

const Main = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const localState = loadState();
  console.log('localState :', localState);
  const [session, setSession] = useState(localState && localState.session);
  const headers = {};
  if (session) {
    headers.authorization = `${session.token_type} ${session.token}`;
  }
  const axiosApi = axios.create({
    headers,
  });

  const login = (data, rememberMe) => axiosApi({
    method: 'post',
    url: 'api/sessions',
    data,
  })
  .then(({ data }) => {
    console.log('data :', data);
    if (data.error) {
      return Promise.reject(data.error);
    }
    setSession(data);
    if (rememberMe) {
      saveState({ session: data });
    }
    // removeState();
  });

  return (
    <preloadedStateContext.Provider
      value={{
        state: { ...window[injectionKey], ...localState },
        saveState,
        session,
        axiosApi,
        login,
      }}
    >
      <Router basename={routerPrefix}>
        {renderRoutes(Routes)}
      </Router>
    </preloadedStateContext.Provider>
  );
};

// const renderMethod = module.hot && !process.env.reactSsrMode ? ReactDOM.render : ReactDOM.hydrate;
const renderMethod = process.env.reactSsrMode ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(
  <Main />,
  document.getElementById('page_main'),
);
