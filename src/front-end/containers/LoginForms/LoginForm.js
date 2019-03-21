import React from 'react';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createIgnoredPreset } from '~/utils/InputLinker/helpers';
import {
  FormSpace,
} from '~/components/FormInputs';
import FormBaseType001 from '~/containers/LoginForms/FormBaseType001';

import createFormPaperStyle from '~/styles/FormPaper';

const styles = theme => ({
  ...createFormPaperStyle(theme),
});

class LoginForm extends React.PureComponent {
  render() {
    const {
      t,
      fields,
      styleNs = [],
      i18nNs = [],
    } = this.props;

    return (
      <FormBaseType001
        {...this.props}
        styleNs={[...styleNs, 'login']}
        i18nNs={[...i18nNs, 'app-common']}
        fields={[
          ...fields,
          {
            presets: [createIgnoredPreset(Button)],
            mwRender: ({ link: { host, hostProps } }) => ({
              variant: 'contained',
              fullWidth: true,
              color: 'primary',
              className: hostProps.classesByNs.login.loginBtn,
              onClick: host.handleSubmit,
              children: t('login'),
            }),
            extraOptions: { space: <FormSpace variant="content1" /> },
          },
        ]}
      />
    );
  }
}

export default compose(
  withTranslation(['app-common']),
  withStyles(styles),
)(LoginForm);
