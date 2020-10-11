import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';

import ThemeContainer from './core/ThemeContainer';

import getMobileDetect from './getMobileDetect';

const uiTheme = {
  direction: 'ltr',
  paletteType: 'light',
  // paletteType: 'dark',
  // paletteType: 'vaxal',
};

const useStyles = makeStyles(() => ({
  '@global': {
    pre: {
      fontFamily: 'FilsonSoftRegular',
      // lineHeight: 'normal',
    },
    body: {
      backgroundColor: '#ffffff',
    },
  },
}));

const Container = ({ children }) => {
  useStyles();
  return (
    <div
      style={{
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default ({ route, ...rest }) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const {
    isMobile,
  } = getMobileDetect(userAgent);

  return (
    <ThemeContainer uiTheme={uiTheme}>
      <Container>
        {renderRoutes(route.routes)}
      </Container>
    </ThemeContainer>
  );
};
