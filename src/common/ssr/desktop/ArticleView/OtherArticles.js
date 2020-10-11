import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  urlPrefix,
} from 'config';

import { getLinkUrl } from '../redirect';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    border: 'solid 1px #000000',
    width: 300,
    // height: 300,
    margin: 10,
    padding: 10,
  },
}));

export default ({ articles }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {
        articles.map(artcle => (
          <div key={artcle.id} className={classes.card}>
            Title:
            <br />
            {artcle.title}
            <br /><br />
            Desc.:
            <br />
            {artcle.description}
            <br /><br />
            <img alt={artcle.title} src={artcle.thumbnail} />
            <br /><br />
            <a href={getLinkUrl(`${artcle.category.routePathPrefix}${artcle.id}`)}>
              Read
            </a>
          </div>
        ))
      }
    </div>
  )
};
