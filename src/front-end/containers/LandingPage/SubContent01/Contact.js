/* eslint-disable no-undef, no-loop-func, react/self-closing-comp, jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { updatePageContext } from '~/styles/getPageContext';
import modelMapEx from '~/containers/App/modelMapEx';

const {
  contactUsMessage,
} = modelMapEx.querchy.promiseActionCreatorSets;

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const useStyles = makeStyles(theme => ({
}));

const Contact = (props) => {
  const classes = useStyles();

  const { t } = useTranslation(['builtin-components']);
  // console.log('classes :', classes);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const submit = () => {
    if (!name) {
      return setNameError('Name Required');
    }
    if (!email) {
      return setEmailError('Email Required');
    } else if (!validateEmail(email)) {
      return setEmailError('Invalid Email');
    }
    if (!content) {
      return setNameError('Content Required');
    }
    return contactUsMessage.create({
      name,
      email,
      data: {},
    })
    .then(() => {
      setName('');
      setNameError('');
      setEmail('');
      setEmailError('');
      setContent('');
      setContentError('');
      handleClickOpen();
    });
  };

  return (
    <div
      style={{
        marginLeft: 16,
        marginRight: 16,
        display: 'flex',
      }}
    >
      <div style={{ flex: 1 }} />
      <div style={{ width: 400 }}>
        {/* <Typography variant="h6" color="primary" className={classes.flex1}>
          訂閱
        </Typography> */}
        <TextField
          id="outlined-name-input"
          label="您的大名"
          className={classes.textField}
          name="name"
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError('');
          }}
          helperText={nameError}
          error={!!nameError}
          required
          fullWidth
        />
        <div style={{ width: 1, height: 12 }} />
        <TextField
          id="outlined-email-input"
          label="電子信箱"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          helperText={emailError}
          error={!!emailError}
          required
          fullWidth
        />
        <div style={{ width: 1, height: 12 }} />
        <TextField
          id="outlined-content"
          label="內容"
          className={classes.textField}
          name="content"
          margin="normal"
          variant="outlined"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setContentError('');
          }}
          helperText={contentError}
          error={!!contentError}
          required
          fullWidth
          multiline
          rows={5}
          rowsMax={10}
        />
        <div style={{ width: 1, height: 12 }} />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }} />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={submit}
          >
            送出
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">發送成功</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            我們已經收到您的訊息，請您耐心等候，我們將由專人回覆至您的信箱，謝謝
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            關閉
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
});

export default compose(
  connect(mapStateToProps, {
    // postSubscriptions,
  }),
)(Contact);
