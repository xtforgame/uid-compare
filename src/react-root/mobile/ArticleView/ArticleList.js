import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArticleCard from '~/components/ArticleCard';

import { Link } from '../redirect';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default ({ articles }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {
        articles.map(artcle => (
          <ArticleCard key={artcle.id} artcle={artcle} Link={Link} />
        ))
      }
    </div>
  );
};
