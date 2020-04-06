/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import {
  FormSpace,
  FormContent,
} from 'azrmui/core/FormInputs';

const styles = theme => ({
  flexContainer: {
    display: 'flex',
  },
  flex1: {
    flex: 1,
  },
  actionBtn: {
  },
});

class ResetPassword extends React.PureComponent {
  static propTypes = {
    onBackToLogin: PropTypes.func.isRequired,
  };

  render() {
    const {
      t,
      classes,
      onBackToLogin,
    } = this.props;

    return (
      <div>
        <FormSpace variant="top" />
        <FormContent>
          <FormSpace variant="content8" />
          <Typography variant="body1">
            {t('passwordResetCompleteMessage')}
          </Typography>
          <FormSpace variant="content8" />
          <div className={classes.flexContainer}>
            <div className={classes.flex1} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.actionBtn}
              onClick={onBackToLogin}
            >
              {t('login')}
            </Button>
          </div>
        </FormContent>
      </div>
    );
  }
}


export default compose(
  connect(null, {}),
  withTranslation(['app-common']),
  withStyles(styles),
)(ResetPassword);
