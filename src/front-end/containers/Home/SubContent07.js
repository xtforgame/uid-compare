import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import createCommonStyles from '~/styles/common';
import SimpleHookLayout from '~/components/FormLayouts/SimpleHookLayout';

import {
  // FormSpace,
  // FormContent,
  FormPasswordInput,
} from '~/components/FormInputs';

// import InputLinker from '~/utils/InputLinker';
import {
  FormTextFieldPreset,
  FormPasswordVisibilityPreset,
  FormCheckboxPreset,
  assert,
  translateLabel,
} from '~/utils/InputLinker/helpers';

const styles = theme => ({
  ...createCommonStyles(theme, ['flex', 'appBar']),
  root: {
    width: '100%',
    overflowX: 'auto',
  },
});

const fileds = [
  {
    name: 'username',
    presets: [FormTextFieldPreset, translateLabel('username')],
    handledByProps: {
      value: 'username',
      onChange: 'onUsernameChange',
    },
    mwRender: [
      ({ link: { hostProps }, options: { translate } }) => ({
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
  },
  {
    name: 'password',
    presets: [FormTextFieldPreset, translateLabel('password')],
    component: FormPasswordInput,
    validate: value => assert(value != null && value !== '', null, { key: 'passwordEmptyError' }),
    childLinks: [
      {
        name: 'passwordVisibility',
        presets: [FormPasswordVisibilityPreset],
        defaultValue: false,
      },
    ],
    extraOptions: { space: <div /> },
  },
  {
    name: 'rememberMe',
    presets: [FormCheckboxPreset, translateLabel('rememberMe')],
    props: { dense: 'true', color: 'primary' },
    defaultValue: false,
  },
];

class SubContent07 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = { username: '' };

  render() {
    const { classes } = this.props;
    const { username } = this.state;
    return (
      <Paper className={classes.root}>
        <SimpleHookLayout
          namespace="form1"
          fields={fileds}
          styleNs={['login']}
          i18nNs={['app-common']}
          defaultValues={{
            password: 'password',
            passwordVisibility: true,
          }}
          username={username}
          onUsernameChange={username => this.setState({ username })}
          // onChange={(...agrs) => { console.log('agrs :', agrs); }}
          // onSubmit={(value) => { console.log('value :', value); }}
          submitButtonText="登入"
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(SubContent07);
