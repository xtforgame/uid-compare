import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import getMemberIdentifier from './getMemberIdentifier';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
  },
}));

export default (props) => {
  const classes = useStyles();
  const {
    member,
    labels,
    onClick,
    action,
    role,
  } = props;

  return (
    <ListItem
      button
      onClick={onClick}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar alt="Logo" src={member.picture || './mail-assets/logo.png'} />
      </ListItemAvatar>
      <ListItemText
        primary={`${member.name}(ID: ${member.id})`}
        secondary={(
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              識別名稱
            </Typography>
            {` — ${getMemberIdentifier(member) || '<無>'}`}
          </React.Fragment>
        )}
      />
      {
        role && (
          <div style={{ marginRight: 16, height: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {role}
          </div>
        )
      }
      {action}
    </ListItem>
  );
};
