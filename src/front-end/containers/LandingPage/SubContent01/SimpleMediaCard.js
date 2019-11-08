import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMediaT1 from '~/components/Card/CardMediaT1';

const useStyles = makeStyles(theme => ({
  cardMedia: {
    // backgroundColor: '#3a2180',
    height: 200,
    width: 300,
  },
  card: {
    width: 300,
    margin: 12,
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardMediaT1
          image="./images/vxl.jpg"
          title="Vaxal"
          className={classes.cardMedia}
        />
        <CardContent>
          <Typography component="p">
            "It's a terrible framework made by a tyrant, please don't contribute to this project"
          </Typography>
          <Typography variant="h5" align="right" component="h2">
            - VAXAL
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button dense="true" color="primary">
            Share
          </Button>
          <Button dense="true" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>
    </div>
  );
};
