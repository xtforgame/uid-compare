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
    extraOptions: { space: <FormSpace variant="content2" /> },
  },
  {
    name: 'agreed',
    presets: [FormCheckboxPreset, addOnPressEnterEvent('handleSubmit')],
    props: { dense: 'true', color: 'primary' },
    defaultValue: false,
    mwPreRender: ({ link: { hostProps } }) => [null, {
      shouldRender: !!hostProps.comfirmUserAgreement,
    }],
    mwRender: ({ link: { hostProps } }) => ({
      label: hostProps.comfirmUserAgreement && hostProps.userAgreementLabel,
    }),
  },
  {
    presets: [createIgnoredPreset(React.Fragment)],
    mwRender: ({ link: { hostProps } }) => ({
      children: !hostProps.comfirmUserAgreement && (hostProps.userAgreementLabel),
    }),
    extraOptions: { space: null },
  },
  {
    presets: [createIgnoredPreset(SuccessButton)],
    mwRender: ({ link: { host, hostProps, linker }, options: { translate } }) => ({
      variant: 'contained',
      fullWidth: true,
      color: 'primary',
      className: hostProps.classes.login,
      onClick: host.handleSubmit,
      children: translate('createAccount'),
      disabled: hostProps.comfirmUserAgreement && !linker.getValue('agreed'),
    }),
    extraOptions: { space: <FormSpace variant="content1" /> },
  },
];
