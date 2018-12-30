import React from 'react';
import Button from '@material-ui/core/Button';
import {
  FormSpace,
} from '~/components/FormInputs';
import {
  FormPhoneOrEmailInputPreset,
  createIgnoredPreset,
  displayErrorFromPropsForTextField,
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
    extraGetProps: [
      displayErrorFromPropsForTextField('passwordError', () => undefined),
      (props, linkInfo, { translate }) => ({
        ...props,
        placeholder: translate('usernameEmptyError', {
          emailAddress: { key: 'emailAddress' },
          phoneNumber: { key: 'phoneNumber' },
        }),
      }),
    ],
    validate: value => assert(value && value.type, null, {
      key: 'usernameEmptyError',
      values: {
        emailAddress: { key: 'emailAddress' },
        phoneNumber: { key: 'phoneNumber' },
      },
    }),
    options: { space: <FormSpace variant="content8" /> },
  },
  {
    presets: [createIgnoredPreset(Button)],
    getProps: (props, { link: { host, hostProps, linker } }) => ({
      variant: 'contained',
      fullWidth: true,
      color: 'secondary',
      disabled: !linker.getOutput('username') || hostProps.remainingTime > 0,
      className: hostProps.classes.loginBtn,
      onClick: host.handleSubmit,
      children: hostProps.countDownText,
    }),
    options: { space: <FormSpace variant="content4" /> },
  },
  {
    presets: [createIgnoredPreset(Button)],
    getProps: (props, { link: { hostProps, linker } }) => ({
      fullWidth: true,
      disabled: !linker.getOutput('username'),
      className: hostProps.classes.loginBtn,
      onClick: hostProps.backToEnterTheCode,
      children: hostProps.enterCodeText,
    }),
    getVisibility: ({ link: { host, linker, hostProps: { lastSentUsername } } }) => lastSentUsername && lastSentUsername === linker.getOutput('username'),
    options: { space: <FormSpace variant="content1" /> },
  },
]);
