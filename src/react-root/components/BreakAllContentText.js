import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    // wordBreak: 'break-all',
    margin: 0,
  },
});

export default ({ className = '', ...props }) => {
  const classes = useStyles();
  return (
    <pre
      {...props}
      className={clsx(classes.root, className)}
    />
  );
};
