/* eslint-disable jsx-a11y/alt-text */

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import BreakAllContentText from '../BreakAllContentText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // textAlign: 'center',
    color: '#000000',
  },
  container: {
    width: 780,
  },
  title: {
    textAlign: 'left',
    fontSize: 40,
    marginTop: 10,
    marginBottom: 40,
  },
  paragraph: {
    textAlign: 'left',
    fontSize: 14,
    marginBottom: 40,
    fontFamily: 'FilsonSoft-Bold',
    lineHeight: 1.5,
  },
  paragraphBody: {
    fontSize: 14,
    fontFamily: 'FilsonSoftRegular',
    lineHeight: 1.5,
  },
  paragraphHeading4: {
    fontSize: 20,
    fontFamily: 'FilsonSoft-Bold',
    lineHeight: 1.5,
  },
  paragraphSubtitle: {
    fontSize: 16,
    fontFamily: 'FilsonSoft-Bold',
    lineHeight: 1.5,
  },
  image: {
    marginBottom: 40,
  },
}));

export default (props) => {
  const {
    data,
  } = props;

  const classes = useStyles();

  if (data.type === 'paragraph') {
    let textClass = classes.paragraphBody;
    switch (data.variant) {
      case 'heading4':
        textClass = classes.paragraphHeading4;
        break;
      case 'subtitle':
        textClass = classes.paragraphSubtitle;
        break;
      default:
        textClass = classes.paragraphBody;
        break;
    }
    return (
      <div>
        <BreakAllContentText className={clsx(classes.paragraph, textClass)}>
          {data.text}
        </BreakAllContentText>
      </div>
    );
  } else if (data.type === 'image') {
    return (
      <div className={classes.image}>
        <img
          width="100%"
          src={data.src}
        />
      </div>
    );
  }
  return null;
};
