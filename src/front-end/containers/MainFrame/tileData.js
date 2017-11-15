// @flow
// This file is shared across the demos.

import React from 'react';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import Icon from 'material-ui/Icon';

export const getMailFolderList = (closeDrawer, onTouchTap01, onTouchTap02, onTouchTap03) => {
  let closeWrapper = (func) => (e) => {
    closeDrawer && closeDrawer();
    func && func(e);
  }
  return (
    <List subheader={<ListSubheader>Mail Folder List</ListSubheader>}>
      <ListItem onTouchTap={closeWrapper(onTouchTap01)} button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem onTouchTap={closeWrapper(onTouchTap02)} button>
        <ListItemIcon>
          <Icon className="fa fa-calculator" style={{
            fontSize: 20,
            padding: 2,
            width: 20,
            height: 20,
          }} />{/*<StarIcon />*/}
        </ListItemIcon>
        <ListItemText primary="Starred" />
      </ListItem>
      <ListItem onTouchTap={closeWrapper(onTouchTap03)} button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Send mail" />
      </ListItem>
      <ListItem onTouchTap={closeWrapper()} button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem>
    </List>
  );
};

export const getOtherMailFolderList = () => (
  <List subheader={<ListSubheader>Other Mail Folder List</ListSubheader>}>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </List>
);
