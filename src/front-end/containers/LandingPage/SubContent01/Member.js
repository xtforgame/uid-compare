import React from 'react';
import Fade from 'react-reveal/Fade';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  topImageContainer: {
    width: '100%',
    position: 'absolute',
    height: 360,
    [theme.breakpoints.up('sm')]: {
      height: 520,
    },
  },
}));

export default (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    image,
    name,
    title,
    discription,
  } = props;
  return (
    <div
      style={{
        flex: 1,
        minWidth: 240,
        maxWidth: 400,
        padding: 12,
        marginBottom: 24,
      }}
    >
      {/* <Fade bottom delay={150} distance="48px">
        <p>Markup that will be revealed on scroll</p>
      </Fade> */}
      <Fade bottom delay={150} distance="48px">
        <CardMedia
          image={image}
          title="Live from space album cover"
          style={{
            margin: '0px auto 0px',
            padding: 12,
            width: 190,
            height: 190,
          }}
        />
        <Typography
          variant="h5"
          style={{ textAlign: 'center', paddingTop: 8, paddingBottom: 8, width: '100%' }}
        >
          {name}
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          style={{ textAlign: 'center', fontWeight: 700, paddingTop: 8, paddingBottom: 8, width: '100%' }}
        >
          {title}
        </Typography>
        <Typography
          component="p"
          variant="subtitle1"
          style={{ paddingTop: 8, paddingBottom: 8, width: '100%' }}
        >
          {discription}
        </Typography>
      </Fade>
    </div>
  );
};
