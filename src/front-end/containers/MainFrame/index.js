import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { push } from 'react-router-redux';
import messages from '../App/messages';
import MainAppBar from './MainAppBar';
import {
  getMailFolderListItems,
  getOtherMailFolderListItems,
} from './tileData';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';

const styles = {
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
  mainContent: {
    margin: 40,
    width: 1200,
  },
  appBarPlaceholder: {
    height: 48,
  },
  verticalFlexContainer: {
    flexDirection: 'column',
    display: 'flex',
    height: '100%',
  },
  flexContainer: {
    flex: 1,
    display: 'flex',
  },
  spacing: {
    flex: 1,
  },
};

class MainFrame extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      drawerOpened: false,
    };
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawerOpened: open,
    });
  };

  componentWillMount(){
    console.log('MainFrame componentWillMount');
  }

  render(){
    let { routeView, push, classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>{getMailFolderListItems(() => push('/home'), () => push('/async-in-main'), () => push('/login'))}</List>
        <Divider />
        <List>{getOtherMailFolderListItems()}</List>
      </div>
    );

    const fullList = (
      <div className={classes.listFull}>
        <List>{getMailFolderListItems(() => push('/home'), () => push('/async-in-main'), () => push('/login'))}</List>
        <Divider />
        <List>{getOtherMailFolderListItems()}</List>
      </div>
    );
    return (
      <div>
        <MainAppBar
          onToggleMenu={this.toggleDrawer(true)}
        />
        <div className={classes.verticalFlexContainer}>
          <div className={classes.appBarPlaceholder} />
          <div className={classes.flexContainer}>
            <div className={classes.spacing} />
            <div className={classes.mainContent}>
              {routeView}
            </div>
            <div className={classes.spacing} />
          </div>
        </div>
        <Drawer open={this.state.drawerOpened} onRequestClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onTouchTap={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      isAuthenticated: state.get('global').isAuthenticated,
    }),
    { push }
  ),
  injectIntl,
  withStyles(styles),
)(MainFrame);
