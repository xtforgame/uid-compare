import React from 'react';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import SimpleFullScreenDialog from '~/components/Dialogs/SimpleFullScreenDialog';
import {
  changeTheme,
} from '~/containers/App/actions';
import {
  makeUiThemeSelector,
} from '~/containers/App/selectors';

const styles = {
};

class UserSettingsDialog extends React.PureComponent {
  handleToggle = () => {
    const {
      uiTheme,
      changeTheme,
    } = this.props;
    changeTheme({
      ...uiTheme,
      paletteType: uiTheme.paletteType === 'dark' ? 'light' : 'dark',
    });
  };

  render() {
    const {
      t,
      open,
      onClose,
      uiTheme,
    } = this.props;
    return (
      <SimpleFullScreenDialog
        title={t('settings')}
        open={open}
        onClose={onClose}
      >
        <List>
          <ListItem
            button
            onClick={this.handleToggle}
          >
            {/* <ListItemIcon>
              <CloseIcon />
            </ListItemIcon> */}
            <ListItemText primary="Dark mode" secondary={uiTheme.paletteType === 'dark' ? 'on' : 'off'} />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleToggle}
                checked={uiTheme.paletteType === 'dark'}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </SimpleFullScreenDialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  uiTheme: makeUiThemeSelector(),
});

export default compose(
  connect(
    mapStateToProps,
    {
      changeTheme,
    },
  ),
  withTranslation(['app-common']),
  withStyles(styles),
)(UserSettingsDialog);
