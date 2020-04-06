import React from 'react';
import Button from '@material-ui/core/Button';
import {
  FormSpace,
} from 'azrmui/core/FormInputs';
import { createIgnoredPreset } from 'azrmui/utils/InputLinker/helpers';
import {
  createRecoveryCodeInput,
} from './inputConfigs';

export default classes => [
  {
    presets: [createIgnoredPreset(React.Fragment)],
    mwRender: ({ link: { hostProps } }) => ({
      children: hostProps.displayLabel,
    }),
    extraOptions: { space: <FormSpace variant="content8" /> },
  },
  createRecoveryCodeInput(),
  {
    component: FormSpace,
    ignoredFromOutputs: true,
    props: { variant: 'content1' },
  },
  {
    component: 'div',
    ignoredFromOutputs: true,
    mwRender: ({ link: { host, hostProps, linker } }) => {
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
    extraOptions: { space: <FormSpace variant="content1" /> },
  },
];
