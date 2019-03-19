import {
  FormPasswordInput,
} from '~/components/FormInputs';

import {
  FormPhoneOrEmailInputPreset,
  FormTextFieldPreset,
  FormPasswordVisibilityPreset,
  FormCodeInputPreset,
  assert,
  translateLabel,
  addOnPressEnterEvent,
  mwpDisplayErrorFromPropsForTextField,
} from '~/utils/InputLinker/helpers';

import {
  isValidPassword,
} from 'common/utils/validators';

export const createSimpleAccountInput = () => ({
  name: 'username',
  presets: [FormTextFieldPreset, translateLabel('username'), addOnPressEnterEvent('handleSubmit')],
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
  validate: value => assert(!!value, null, {
    key: 'usernameEmptyError',
    values: {
      emailAddress: '$t(emailAddress)',
      phoneNumber: '$t(phoneNumber)',
    },
  }),
});

export const createPhoneOrEmailAccountInput = () => ({
  name: 'username',
  presets: [FormPhoneOrEmailInputPreset, translateLabel('username'), addOnPressEnterEvent('handleSubmit')],
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
});

export const createNonemptyPasswordInput = () => ({
  name: 'password',
  presets: [FormTextFieldPreset, translateLabel('password'), addOnPressEnterEvent('handleSubmit')],
  component: FormPasswordInput,
  mwRender: mwpDisplayErrorFromPropsForTextField('passwordError'),
  validate: value => assert(value != null && value !== '', null, { key: 'passwordEmptyError' }),
  childLinks: [
    {
      name: 'passwordVisibility',
      presets: [FormPasswordVisibilityPreset],
      defaultValue: false,
    },
  ],
});

export const createValidPasswordInput = () => ({
  name: 'password',
  presets: [FormTextFieldPreset, translateLabel('password'), addOnPressEnterEvent('handleSubmit')],
  component: FormPasswordInput,
  mwRender: mwpDisplayErrorFromPropsForTextField('passwordError'),
  validate: value => assert(isValidPassword(value), null, { key: 'wrongPasswordFormatError' }),
  childLinks: [
    {
      name: 'passwordVisibility',
      presets: [FormPasswordVisibilityPreset],
      defaultValue: false,
    },
  ],
});

export const createRecoveryCodeInput = () => ({
  name: 'recoveryCode',
  presets: [FormCodeInputPreset, translateLabel('recoveryCode'), addOnPressEnterEvent('challengeRecoveryToken')],
  mwRender: mwpDisplayErrorFromPropsForTextField('recoveryCodeError'),
});
