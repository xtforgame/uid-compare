import React from 'react';
import Button from '@material-ui/core/Button';
import {
  FormSpace,
} from '~/components/FormInputs';
import {
  FormPhoneOrEmailInputPreset,
  createIgnoredPreset,
  mwpDisplayErrorFromPropsForTextField,
  assert,
  translateLabel,
  addOnPressEnterEvent,
} from '~/utils/InputLinker/helpers';

export default recover => ([
  {
    name: 'username',
    presets: [FormPhoneOrEmailInputPreset, translateLabel('username'), addOnPressEnterEvent(recover)],
    handledByProps: {
      value: 'username',
      onChange: 'onUsernameChange',
    },
    mwRender: [
      mwpDisplayErrorFromPropsForTextField('passwordError', () => undefined),
      ({ options: { translate } }) => ({
        placeholder: translate('usernameEmptyError', {
          emailAddress: '$t(emailAddress)',
          phoneNumber: '$t(phoneNumber)',
        }),
      }),
    ],
    validate: value => assert(value && value.type, null, {
      key: 'usernameEmptyError',
      values: {
        emailAddress: '$t(emailAddress)',
        phoneNumber: '$t(phoneNumber)',
      },
    }),
    extraOptions: { space: <FormSpace variant="content8" /> },
  },
  {
    presets: [createIgnoredPreset(Button)],
    mwRender: ({ link: { host, hostProps, linker } }) => ({
      variant: 'contained',
      fullWidth: true,
      color: 'secondary',
      disabled: !linker.getOutput('username') || hostProps.remainingTime > 0,
      className: hostProps.classes.loginBtn,
      onClick: host.handleSubmit,
      children: hostProps.countDownText,
    }),
    extraOptions: { space: <FormSpace variant="content4" /> },
  },
  {
    presets: [createIgnoredPreset(Button)],
    mwPreRender: ({ link: { linker, hostProps: { lastSentUsername } } }) => [null, {
      shouldRender: lastSentUsername && lastSentUsername === linker.getOutput('username'),
    }],
    mwRender: ({ link: { hostProps, linker } }) => ({
      fullWidth: true,
      disabled: !linker.getOutput('username'),
      className: hostProps.classes.loginBtn,
      onClick: hostProps.backToEnterTheCode,
      children: hostProps.enterCodeText,
    }),
    extraOptions: { space: <FormSpace variant="content1" /> },
  },
]);
