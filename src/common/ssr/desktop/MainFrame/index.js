import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';
import Header from './Header';

import {
  urlPrefix,
} from 'config';

import redirect from '../redirect';

const useStyles = makeStyles(theme => ({
  root: {},
  appBarPlaceholder: {
    ...theme.mixins.toolbar,
    // height: 56,
    // [theme.breakpoints.up('sm')]: {
    //   height: 64,
    // },
    flexShrink: 0,
  },
}));

export default ({ route: { routes } }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.appBarPlaceholder} />
      {renderRoutes(routes)}
    </div>
  );
};
