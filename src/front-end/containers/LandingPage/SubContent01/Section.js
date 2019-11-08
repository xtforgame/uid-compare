import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
}));

export default (props) => {
  const {
    grey,
    title,
    subtitle,
    children,
  } = props;
  const classes = useStyles();

  // background: '#e9e9e9'
  return (
    <div style={{ background: grey ? '#e9e9e9' : 'transparent' }}>
      <div style={{ width: '100%', height: 40 }} />
      <Typography
        variant="h4"
        style={{ textAlign: 'center', padding: 8, width: '100%' }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          style={{
            fontStyle: 'italic',
            color: '#606060',
            textAlign: 'center',
            padding: 8,
            width: '100%',
          }}
        >
          {subtitle}
        </Typography>
      )}
      <div style={{ width: '100%', height: 20 }} />
      {children}
      <div style={{ width: '100%', height: 40 }} />
    </div>
  );
};
