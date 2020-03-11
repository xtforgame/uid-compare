// @flow
// This file is shared across the demos.

import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import getListHierarchy from './getListHierarchy';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    background: theme.palette.background.paper,
  },
  listItem: {
    backgroundColor: fade(theme.palette.primary.main, 0.15 /* theme.palette.action.hoverOpacity = 0.08 */),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  inline: {
    display: 'inline',
  },
});

class RouteList extends React.PureComponent {
  state = {};

  handleClick = name => () => {
    this.setState({ [`open-${name}`]: !this.state[`open-${name}`] });
  };

  render() {
    const listHierarchy = getListHierarchy();
    const { closeDrawer = () => {}, push, classes } = this.props;
    const navigateToFunc = path => (e) => {
      closeDrawer();
      if (path) {
        push(path);
      } else {
        push('/');
      }
    };

    return (
      <React.Fragment>
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => closeDrawer()}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.root}>
          {
            Array.from({ length: 2 }).map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <ListSubheader>
                    新通知
                  </ListSubheader>
                  {
                    Array.from({ length: 10 }).map((_, j) => {
                      return (
                        <ListItem className={classes.listItem} key={j} button alignItems="flex-start" onClick={navigateToFunc()}>
                          <ListItemAvatar>
                            <Avatar alt="Star Border">
                              <StarBorder />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Brunch this weekend?"
                            secondary={(
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                              </React.Fragment>
                            )}
                          />
                        </ListItem>
                      );
                    })
                  }
                </React.Fragment>
              );
            })
          }
        </List>
      </React.Fragment>
    );
  }
}

export default compose(
  connect(
    state => ({}),
    { push }
  ),
  withStyles(styles),
)(RouteList);
