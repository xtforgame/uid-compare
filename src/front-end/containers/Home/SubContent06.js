import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import createCommonStyles from '~/styles/common';
import EditableLayout from '~/components/FormLayouts/EditableLayout';
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
    extraProps: { label: 'Temp Data' },
  },
  {
    name: 'persistentData',
    presets: [FormTextFieldPreset],
    extraProps: { label: 'Persistent Data' },
    extraOptions: { space: <div /> },
  },
];

class SubContent06 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = { username: '', persistentData: '', isEditing: false };

  render() {
    const { classes } = this.props;
    const { username, persistentData, isEditing } = this.state;
    return (
      <Paper className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.setState({ isEditing: !isEditing })}
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
          isEditing={isEditing}
          username={username}
          onUsernameChange={username => this.setState({ username })}
          // onChange={(...agrs) => { console.log('agrs :', agrs); }}
          onSubmit={value => this.setState({ isEditing: !isEditing, persistentData: value.persistentData })}
          submitButtonText="登入"
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(SubContent06);
