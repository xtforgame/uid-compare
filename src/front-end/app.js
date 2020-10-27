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

class DebugRouter extends BrowserRouter {
  constructor(props) {
    super(props);
    // console.log('initial history is: ', JSON.stringify(this.history, null, 2));
    this.history.listen((location, action) => {
      // console.log(
      //   `The current URL is ${location.pathname}${location.search}${location.hash}`
      // );
      // console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
    });
  }
}

const Router = process.env.reactSsrMode ? DebugRouter : HashRouter;


const getCookieValueByIndex = (startIndex) => {
  let endIndex = document.cookie.indexOf(';', startIndex);
  if (endIndex === -1) endIndex = document.cookie.length;
  return unescape(document.cookie.substring(startIndex, endIndex));
};

const getCookie = (name) => {
  const arg = `${escape(name)}=`;
  const nameLen = arg.length;
  const cookieLen = document.cookie.length;
  let i = 0;
  while (i < cookieLen) {
    const j = i + nameLen;
    if (document.cookie.substring(i, j) === arg) return getCookieValueByIndex(j);
    i = document.cookie.indexOf(' ', i) + 1;
    if (i === 0) break;
  }
  return null;
};

const Main = () => {
  const localState = loadState();
  console.log('localState :', localState);

  const [sessionExists, setSessionExists] = useState(getCookie('login-session-exists') === 'true');
  const [session, setSession] = useState(localState && localState.session);
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const headers = {};
  // if (session) {
  //   headers.authorization = `${session.token_type} ${session.token}`;
  // }
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
    setSessionExists(getCookie('login-session-exists') === 'true');
    if (rememberMe) {
      saveState({ session: data });
    }
    return true;
    // removeState();
  });

  return (
    <preloadedStateContext.Provider
      value={{
        state: {
          ...window[injectionKey],
          ...localState,
          ...{ session },
          sessionExists: !!sessionExists,
        },
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
