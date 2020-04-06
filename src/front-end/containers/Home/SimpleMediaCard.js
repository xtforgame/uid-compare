import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMediaT1 from 'azrmui/core/Card/CardMediaT1';
import lizard from './contemplative-reptile.jpg';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardMediaT1
          image={lizard}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense="true" color="primary">
            Share
          </Button>
          <Button dense="true" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
