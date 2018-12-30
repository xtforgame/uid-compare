/* eslint-disable no-underscore-dangle */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import BreakAllContentText from '~/components/Text/BreakAllContentText';
import {
  FormTextField,
  FormTextInput,
  FormCodeInput,
  FormCheckbox,
  FormPhoneOrEmailInput,
} from '~/components/FormInputs';
import { isAllDigital } from 'common/utils/validators';

export const assert = (condition, message, i18n) => {
  if (!condition) {
    const error = new Error(message || 'Validation failed');
    error.i18n = i18n;
    throw error;
  }
};

export const FormTextFieldPreset = cfg => ({
  ...cfg,
  InputComponent: FormTextField,
  extraGetProps: (props, {
    value,
    link,
    handleChange,
    validateError,
  },
  { translate } = {}) => {
    const validateErrorMessage = validateError && (
      (validateError.i18n && translate(validateError.i18n.key, validateError.i18n.values))
      || validateError.message
    );

    return {
      ...props,
      id: link.key,
      value,
      onChange: handleChange,
      error: !!validateErrorMessage,
      helperText: validateErrorMessage, // helperMessage,
    };
  },
});

export const displayErrorFromPropsForTextField = (propKey, getMessageFunc = e => e) => (
  props,
  { link: { hostProps }, validateError }
) => {
  const newProps = { ...props };
  const errorFromProps = hostProps[propKey];
  if (!validateError && errorFromProps) {
    newProps.error = true;
    newProps.helperText = getMessageFunc(errorFromProps);
  }
  return newProps;
};

export const FormTextInputPreset = cfg => ({
  ...cfg,
  InputComponent: FormTextInput,
  extraGetProps: (props, {
    value,
    link,
    handleChange,
    validateError,
  },
  { translate } = {}) => {
    const validateErrorMessage = validateError && (
      (validateError.i18n && translate(validateError.i18n.key, validateError.i18n.values))
      || validateError.message
    );

    return {
      ...props,
      id: link.key,
      value,
      onChange: handleChange,
      formProps: {
        error: validateErrorMessage,
      },
      helperText: validateErrorMessage, // helperMessage,
    };
  },
});

export const FormPasswordVisibilityPreset = cfg => ({
  ...cfg,
  extraGetProps: (props, { value, handleChange }) => ({
    ...props,
    type: value ? 'text' : 'password',
    onShowPassswordClick: handleChange,
  }),
  ignoredFromOutputs: true,
  converter: {
    fromView: ((_, { storedValue }) => !storedValue),
    toOutput: () => undefined,
  },
});

export const FormCheckboxPreset = cfg => ({
  ...cfg,
  InputComponent: FormCheckbox,
  extraGetProps: (props, {
    value,
    link,
    handleChange,
    validateError,
  },
  { translate } = {}) => ({
    ...props,
    id: link.key,
    onChange: handleChange,
    checked: value,
  }),
  converter: {
    fromView: (([e, v]) => v),
  },
});

export const FormPhoneOrEmailInputPreset = {
  presets: [FormTextFieldPreset],
  InputComponent: FormPhoneOrEmailInput,
  props: { enablePhone: true },
  converter: {
    toView: (value => (value && value.rawInput) || ''),
    fromView: (([value]) => value),
    toOutput: (value => value && value.value),
  },
};

export const FormCodeInputPreset = {
  presets: [FormTextFieldPreset],
  InputComponent: FormCodeInput,
  converter: {
    fromView: (([e], { storedValue }) => (
      (
        !e.target.value
        || (isAllDigital(e.target.value) && e.target.value.length <= 6)
      ) ? e.target.value : storedValue)
    ),
  },
  validate: value => assert(value, null),
};

export const createIgnoredPreset = InputComponent => cfg => ({
  ...cfg,
  InputComponent,
  ignoredFromOutputs: true,
});

export const ListItemDisplayerPreset = (props, { value, link: { name, hostProps } }) => ({
  key: props.key,
  children: (
    <ListItemText
      key={name}
      disableTypography
      primary={(
        <Typography variant="subtitle1">
          {props.label || name}
        </Typography>
      )}
      secondary={(
        <Typography component={BreakAllContentText} color="textSecondary">
          {hostProps.defaultValues[name]}
        </Typography>
      )}
    />
  ),
});

export const translateLabel = i18nKey => ({
  extraGetProps: (props, { link: { host } }, { translate }) => ({
    ...props,
    label: i18nKey && translate(i18nKey),
  }),
});

export const addOnPressEnterEvent = (onPressEnter = undefined) => ({
  extraGetProps: (props, { link: { host } }) => {
    const onPressEnterFunction = typeof onPressEnter === 'string' ? host[onPressEnter] : onPressEnter;
    return {
      ...props,
      onPressEnter: onPressEnterFunction && ((e) => {
        e.preventDefault();
        onPressEnterFunction(e);
      }),
    };
  },
});

export const propagateOnChangeEvent = (parentOnChangePropName = 'onChange') => (cfg) => {
  const originalOnChange = cfg.onChange || (() => {});
  return {
    ...cfg,
    onChange: (value, rawArgs, linkInfo) => {
      originalOnChange(value, rawArgs, linkInfo);
      const { link: { name, linker, hostProps } } = linkInfo;
      const onChange = hostProps[parentOnChangePropName] || (() => {});
      onChange(name, value, rawArgs, linker);
    },
  };
};

export const createDefaultContainer = getSpace => extraChildElements => ({
  ignoredFromOutputs: true,
  mergeChildren: (_, childrenElements, linkInfo) => childrenElements.reduce(
    (a, c, i) => {
      const array = a.concat([c]);
      if (i < childrenElements.length - 1) {
        array.push(getSpace(linkInfo));
      }
      return array;
    },
    [],
  ),
  extraChildElements,
  middlewares: {
    last: cfg => ({
      ...cfg,
      ...(cfg.InputComponent || cfg.getInputComponent ? {} : { InputComponent: React.Fragment }),
    }),
  },
});
