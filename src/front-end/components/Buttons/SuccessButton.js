import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import createButtonStyles from '~/styles/Buttons';

const styles = theme => ({
  ...createButtonStyles(theme, 'success'),
});

const SuccessButton = ({ classes, ...props }) => (
  <Button
    variant="contained"
    classes={{
      containedPrimary: classes.containedPrimary,
    }}
    {...props}
  />
);

export default compose(
  withStyles(styles),
)(SuccessButton);
