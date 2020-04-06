import React from 'react';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import {
  FormSpace,
  FormContent,
  // FormTextField,
  FormPasswordInput,
  // FormCheckbox,
} from 'azrmui/core/FormInputs';

import InputLinker from 'azrmui/utils/InputLinker';
import {
  FormTextFieldPreset,
  mwpDisplayErrorFromPropsForTextField,
  FormPasswordVisibilityPreset,
  FormCheckboxPreset,
  assert,
} from 'azrmui/utils/InputLinker/helpers';

import createCommonStyles from 'azrmui/styles/common';
import createFormPaperStyle from 'azrmui/styles/FormPaper';

const styles = theme => ({
  ...createFormPaperStyle(theme),
  ...createCommonStyles(theme, 'flex'),
});

class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.il = new InputLinker(this, {
      namespace: 'login',
    });
    this.il.add(
      [FormTextFieldPreset, cfg => ({
        ...cfg,
        name: 'username',
        // onChange: (value, [e], { link: { hostProps } }) => {
        //   hostProps.onUsernameChange(e.target.value);
        // },
        handledByProps: {
          value: 'username',
          onChange: 'onUsernameChange',
        },
        mwRender: [
          mwpDisplayErrorFromPropsForTextField('passwordError', () => undefined),
          { onKeyPress: this.handleEnterForTextField },
          ({ options: { translate } }) => ({
            label: translate('username'),
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
      })],
      [FormTextFieldPreset, {
        name: 'password',
        component: FormPasswordInput,
        mwRender: [
          mwpDisplayErrorFromPropsForTextField('passwordError'),
          { onKeyPress: this.handleEnterForTextField },
          ({ options: { translate } }) => ({
            label: translate('password'),
          }),
        ],
        validate: value => assert(value != null && value !== '', null, { key: 'passwordEmptyError' }),
      }],
      {
        name: 'passwordVisibility',
        presets: [FormPasswordVisibilityPreset],
      },
      [FormCheckboxPreset, cfg => ({
        ...cfg,
        name: 'rememberMe',
        props: { dense: 'true', color: 'primary' },
        defaultValue: (this.props.defaultRememberMe !== undefined ? this.props.defaultRememberMe : false),
        mwRender: ({ link: { host }, options: { translate } }) => ({
          onKeyPress: host.handleEnterForTextField,
          label: translate('rememberMe'),
        }),
      })]
    );

    this.state = this.il.mergeInitState({});
  }

  handleSubmit = () => {
    const { onSubmit = () => {} } = this.props;

    const {
      username,
      password,
      rememberMe,
    } = this.il.getOutputs();

    if (this.il.validate()) {
      onSubmit(username, password, rememberMe);
    }
  }

  handleEnterForTextField = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
      event.preventDefault();
    }
  };

  render() {
    const {
      t,
      handleCreateAccount = () => {},
      classes,
    } = this.props;
    const translate = t;


    return (
      <div>
        <FormSpace variant="top" />
        <FormContent>
          {/* <FormTextField
            {...this.il.renderComponent('username', { translate })}
          /> */}
          {...this.il.renderComponent('username', { translate })}
          <FormSpace variant="content1" />
          {/* <FormPasswordInput
            {...this.il.renderProps('password', { translate })}
            {...this.il.renderProps('passwordVisibility', { translate })}
          /> */}
          {...this.il.renderComponent('password', {
            translate,
            extraProps: this.il.renderProps('passwordVisibility', { translate }),
          })}
          {/* <FormCheckbox
            {...this.il.renderProps('rememberMe', { translate })}
          /> */}
          {...this.il.renderComponent('rememberMe', { translate })}
          <FormSpace variant="content1" />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.loginBtn}
            onClick={this.handleSubmit}
          >
            {t('login')}
          </Button>
          <FormSpace variant="content1" />
        </FormContent>
        <Divider />
        <FormContent>
          <Button fullWidth className={classes.loginBtn} onClick={handleCreateAccount}>
            {t('createAccount')}
          </Button>
        </FormContent>
      </div>
    );
  }
}

export default compose(
  withTranslation(['app-common']),
  withStyles(styles),
)(LoginForm);
