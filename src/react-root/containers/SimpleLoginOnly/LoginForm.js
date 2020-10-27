import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  FormSpace,
  FormContent,

  FormPasswordInput,
  FormCheckbox,
  FormPhoneOrEmailInput,
} from 'azrmui/core/FormInputs';

const useStyles = makeStyles(theme => ({
  loginBtn: {
    marginTop: 6,
    marginBottom: 6,
    float: 'right',
  },
}));

export default (props) => {
  const classes = useStyles();

  const {
    username,
    onUsernameChange,
    usernameError,
    passwordError,
    onSubmit,
  } = props;

  const [password, setPassword] = useState('');
  const [showPassword, setShowPpassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <React.Fragment>
      <FormSpace variant="top" />
      <FormContent>
        <FormPhoneOrEmailInput
          label="帳號"
          error={!!usernameError}
          helperText={usernameError}
          placeholder="請輸入E-mail"
          value={username}
          onChange={value => onUsernameChange(value && value.rawInput)}
        />
        <FormSpace variant="content2" />
        <FormPasswordInput
          id="password"
          label="密碼"
          error={!!passwordError}
          helperText={passwordError}
          type={showPassword ? 'text' : 'password'}
          placeholder="請輸入密碼"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onShowPassswordClick={() => setShowPpassword(!showPassword)}
        />
        <FormSpace variant="content1" />
        <FormCheckbox
          dense="true"
          label="記住我"
          color="primary"
          checked={rememberMe}
          onChange={(e, checked) => {
            setRememberMe(checked);
          }}
        />
        <FormSpace variant="content2" />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.loginBtn}
          onClick={() => {
            onSubmit({
              username,
              password,
              rememberMe,
            });
          }}
        >
          登入
        </Button>
      </FormContent>
    </React.Fragment>
  );
};
