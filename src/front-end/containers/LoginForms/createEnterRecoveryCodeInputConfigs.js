import React from 'react';
import Button from '@material-ui/core/Button';
import {
  FormSpace,
} from '~/components/FormInputs';
import { createIgnoredPreset } from '~/utils/InputLinker/helpers';
import {
  createRecoveryCodeInput,
} from './inputConfigs';

export default classes => [
  {
    presets: [createIgnoredPreset(React.Fragment)],
    getProps: (props, { link: { hostProps } }) => ({
      children: hostProps.displayLabel,
    }),
    options: { space: <FormSpace variant="content8" /> },
  },
  createRecoveryCodeInput(),
  {
    InputComponent: FormSpace,
    ignoredFromOutputs: true,
    props: { variant: 'content1' },
  },
  {
    InputComponent: 'div',
    ignoredFromOutputs: true,
    getProps: (props, { link: { host, hostProps, linker } }) => {
      const recoveryCode = linker.getOutput('recoveryCode');
      return {
        className: classes.flexContainer,
        children: (
          <React.Fragment>
            {hostProps.onResend && (
              <Button
                color="default"
                onClick={hostProps.onResend}
              >
                {hostProps.resendText}
              </Button>
            )}
            <div className={classes.flex1} />
            <Button
              variant="contained"
              color="primary"
              disabled={!recoveryCode || recoveryCode.length !== 6}
              onClick={host.handleSubmit}
            >
              {hostProps.enterCodeText}
            </Button>
          </React.Fragment>
        ),
      };
    },
    options: { space: <FormSpace variant="content1" /> },
  },
];
