/* eslint-disable flowtype/require-valid-file-annotation, no-underscore-dangle */
// https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/AppWrapper.js
import React from 'react';
import { makeStyles } from '~/styles/NativeTheme';

const useStyles = makeStyles(theme => ({
  button: {
    background: ({ theme }) => theme.palette.primary.main,
    color: ({ theme }) => theme.palette.text.default,
  },
}));

const Button = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <button
      type="button"
      className={classes.button}
    >
      {children}
    </button>
  );
};

export default () => (
  <Button>Green Button</Button>
);
