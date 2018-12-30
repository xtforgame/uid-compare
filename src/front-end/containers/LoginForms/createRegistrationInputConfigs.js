import React from 'react';
import SuccessButton from '~/components/Buttons/SuccessButton';
import {
  FormSpace,
} from '~/components/FormInputs';
import {
  FormCheckboxPreset,
  createIgnoredPreset,
  addOnPressEnterEvent,
} from '~/utils/InputLinker/helpers';

import {
  createPhoneOrEmailAccountInput,
  createValidPasswordInput,
} from './inputConfigs';

export default (defaultRememberMe = false) => [
  createPhoneOrEmailAccountInput(),
  {
    ...createValidPasswordInput(),
    options: {
      space: <FormSpace variant="content2" />,
    },
  },
  {
    name: 'agreed',
    presets: [FormCheckboxPreset, addOnPressEnterEvent('handleSubmit')],
    props: { dense: 'true', color: 'primary' },
    defaultValue: false,
    getVisibility: ({ link: { hostProps } }) => hostProps.comfirmUserAgreement,
    extraGetProps: (props, { link: { hostProps } }, { translate }) => ({
      ...props,
      label: hostProps.comfirmUserAgreement && hostProps.userAgreementLabel,
    }),
  },
  {
    presets: [createIgnoredPreset(React.Fragment)],
    getProps: (props, { link: { hostProps, linker } }) => ({
      children: !hostProps.comfirmUserAgreement && (hostProps.userAgreementLabel),
    }),
    options: { space: null },
  },
  {
    presets: [createIgnoredPreset(SuccessButton)],
    extraGetProps: (props, { link: { host, hostProps, linker } }, { translate }) => ({
      variant: 'contained',
      fullWidth: true,
      color: 'primary',
      className: hostProps.classes.login,
      onClick: host.handleSubmit,
      children: translate('createAccount'),
      disabled: hostProps.comfirmUserAgreement && !linker.getValue('agreed'),
    }),
    options: { space: <FormSpace variant="content1" /> },
  },
];
