import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useStateWithError from 'azrmui/hooks/useStateWithError';
import FormDialogInput from 'azrmui/core/FormInputs/FormDialogInput';
import { FormPasswordInput, FormSpace } from 'azrmui/core/FormInputs';
import { useConnect } from 'azrmui/hooks/redux-react-hook-ex';
import modelMapEx from '~/containers/App/modelMapEx';
import SimpleFullScreenDialog from 'azrmui/core/Dialogs/SimpleFullScreenDialog';

const {
  accountLink,
  // userSetting,
  // organization,
  // project,
} = modelMapEx.querchy.promiseActionCreatorSets;

const mapStateToProps = createStructuredSelector({
  session: modelMapEx.cacher.selectorCreatorSet.session.selectMe(),
});

const mapDispatchToProps = {};

const useStyles = makeStyles(theme => ({
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    overflowX: 'hidden',
    flex: 1,
  },
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    background: theme.palette.background.default,
    padding: 8,
    [theme.breakpoints.up('sm')]: {
      padding: 48,
    },
  },
  mainContainer: {
    width: '100%',
  },
  textField: {
    width: 300,
  },
}));

export default (props) => {
  const {
    dialogProps,
  } = props;

  const classes = useStyles();
  const {
    session: {
      jwtPayload: {
        user_id,
        auth_type,
        auth_id,
      },
    },
  } = useConnect(mapStateToProps, mapDispatchToProps);

  const [value, setValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword, passwordError, setPasswordError] = useStateWithError('');
  const [newPassword, setNewPassword, newPasswordError, setNewPasswordError] = useStateWithError('');
  const [confirmNewPassword, setConfirmNewPassword, confirmNewPasswordError, setConfirmNewPasswordError] = useStateWithError('');
  const { enqueueSnackbar } = useSnackbar();

  const submit = (onClose) => {
    if (!password) {
      return setPasswordError('密碼不能為空');
    }
    if (!newPassword) {
      return setNewPasswordError('新密碼不能為空');
    }
    if (confirmNewPassword !== newPassword) {
      return setConfirmNewPasswordError('新密碼輸入不一致');
    }

    const accountLinkResourceUrl = `./api/users/${user_id}/accountLinks/basic`;
    accountLink.update(auth_type, {
      auth_type: 'basic',
      username: auth_id,
      password,
      newPassword,
    }, { queryId: accountLinkResourceUrl, actionProps: { url: accountLinkResourceUrl } })
    .then(() => {
      enqueueSnackbar('密碼變更成功', { variant: 'success' });
      onClose();
    })
    .catch(() => setPasswordError('密碼錯誤'));
  };

  return (
    <FormDialogInput
      title="變更密碼"
      label="DateRange"
      value={value}
      displayValue={() => 'XX'}
      renderButton={({ buttonProps }) => (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          {...buttonProps}
        >
          變更密碼
        </Button>
      )}
      onChange={setValue}
      // buttonProps={{
      //   fullWidth: true,
      // }}
      dialogProps={dialogProps}
      renderDialog={({
        label,
        title,
        open,
        handleClose,
        value,
        dialogProps,
      }) => (
        <SimpleFullScreenDialog
          title={title}
          {...dialogProps}
        >
          <div className={classes.root}>
            <div className={classes.paperRoot}>
              <div style={{ width: '100%' }}>
                <FormPasswordInput
                  error={!!passwordError}
                  helperText={passwordError || ''}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  label="請輸入您的密碼"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onShowPassswordClick={e => setShowPassword(!showPassword)}
                  autoFocus
                  fullWidth
                />
                <FormSpace variant="content2" />
                <FormPasswordInput
                  error={!!newPasswordError}
                  helperText={newPasswordError || ''}
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  label="請輸入您的新密碼"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  onShowPassswordClick={e => setShowPassword(!showPassword)}
                  fullWidth
                />
                <FormSpace variant="content2" />
                <FormPasswordInput
                  error={!!confirmNewPasswordError}
                  helperText={confirmNewPasswordError || ''}
                  id="confrimNewPassword"
                  type={showPassword ? 'text' : 'password'}
                  label="請再次輸入您的新密碼"
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                  onShowPassswordClick={e => setShowPassword(!showPassword)}
                  fullWidth
                />
                <FormSpace variant="content2" />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    // aria-label="Add"
                    // aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      submit(handleClose);
                    }}
                  >
                    確認變更
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SimpleFullScreenDialog>
      )}
    />
  );
};
