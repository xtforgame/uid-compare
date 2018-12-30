import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import createCommonStyles from '~/styles/common';
import EditableLayout from '~/components/FormLayouts/EditableLayout';
import { messages } from '~/containers/App/translation';
import {
  FormTextFieldPreset,
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
    name: 'tempData',
    presets: [FormTextFieldPreset],
    extraGetProps: { label: 'Temp Data' },
  },
  {
    name: 'persistentData',
    presets: [FormTextFieldPreset],
    extraGetProps: { label: 'Persistent Data' },
    options: { space: <div /> },
  },
];

class SubContent06 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = { username: '', persistentData: '', editing: false };

  render() {
    const { classes } = this.props;
    const { username, persistentData, editing } = this.state;
    return (
      <Paper className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.setState({ editing: !editing })}
        >
          Modify
        </Button>
        <EditableLayout
          namespace="form1"
          fields={fileds}
          defaultValues={{
            persistentData,
            rememberMe: false,
            password: 'password',
            passwordVisibility: true,
          }}
          editing={editing}
          username={username}
          onUsernameChange={username => this.setState({ username })}
          // onChange={(...agrs) => { console.log('agrs :', agrs); }}
          onSubmit={value => this.setState({ editing: !editing, persistentData: value.persistentData })}
          submitButtonText="登入"
          i18nMessages={messages}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(SubContent06);
