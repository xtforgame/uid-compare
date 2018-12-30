import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
  FormSpace,
  FormPasswordInput,
} from '~/components/FormInputs';

import {
  FormTextFieldPreset,
  createIgnoredPreset,
  displayErrorFromPropsForTextField,
  FormPasswordVisibilityPreset,
  assert,
  translateLabel,
  addOnPressEnterEvent,
} from '~/utils/InputLinker/helpers';
import {
  isValidPassword,
} from 'common/utils/validators';

export default classes => [
  {
    InputComponent: FormSpace,
    ignoredFromOutputs: true,
    props: { variant: 'content2' },
  },
  {
    presets: [createIgnoredPreset(React.Fragment)],
    getProps: (props, { link: { host, hostProps, linker } }) => ({
      ...props,
      children: (
        <React.Fragment>
          <Typography variant="body1" color="secondary">
            {hostProps.recoveryCodeError}
          </Typography>
          <FormSpace variant="content4" />
        </React.Fragment>
      ),
    }),
    getVisibility: ({ link: { hostProps } }) => hostProps.recoveryCodeError,
  },
  {
    name: 'newPassword',
    presets: [FormTextFieldPreset, translateLabel('enterNewPassword'), addOnPressEnterEvent('resetPassword')],
    InputComponent: FormPasswordInput,
    extraGetProps: displayErrorFromPropsForTextField('passwordError'),
    validate: value => assert(isValidPassword(value), null, { key: 'wrongPasswordFormatError' }),
    childLinks: [
      {
        name: 'passwordVisibility',
        presets: [FormPasswordVisibilityPreset],
        defaultValue: false,
      },
    ],
    options: { space: <FormSpace variant="content4" /> },
  },
  {
    name: 'confrimPassword',
    presets: [FormTextFieldPreset, translateLabel('reenterNewPassword'), addOnPressEnterEvent('resetPassword')],
    InputComponent: FormPasswordInput,
    extraGetProps: displayErrorFromPropsForTextField('passwordError'),
    validate: (value, { link: { linker } }) => {
      const newPassword = linker.getOutput('newPassword');
      assert(newPassword === value, null, { key: 'confirmPasswordError' });
    },
    childLinks: [
      {
        name: 'passwordVisibility',
        presets: [FormPasswordVisibilityPreset],
        defaultValue: false,
      },
    ],
    options: { space: <FormSpace variant="content4" /> },
  },
  {
    presets: [createIgnoredPreset(React.Fragment)],
    getProps: (props, { link: { host, hostProps, linker } }) => ({
      ...props,
      children: (
        <div className={classes.flexContainer}>
          <div className={classes.flex1} />
          <Button
            variant="contained"
            color="primary"
            disabled={!linker.getValue('newPassword') || !linker.getValue('confrimPassword')}
            onClick={host.handleSubmit}
          >
            {hostProps.setNewPasswordText}
          </Button>
        </div>
      ),
    }),
  },
];
