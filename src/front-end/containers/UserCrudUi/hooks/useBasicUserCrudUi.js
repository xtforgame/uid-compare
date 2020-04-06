import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import MemberListItem from '../shared/MemberListItem';

export default (options = {}) => {
  // const {} = options;
  const [searchText, setSearchText] = useState('');
  const onSearchTextChange = t => setSearchText(t);
  const onStartSearch = () => setSearchText('');
  const onFinishSearch = () => setSearchText('');

  const renderAddItem = ({
    handleItemClick,
  }) => (
    <React.Fragment>
      <ListItem button onClick={() => handleItemClick({ defaultText: searchText })}>
        <ListItemAvatar>
          <Avatar alt="Logo" src="./mail-assets/logo.png" />
        </ListItemAvatar>
        <ListItemText primary={searchText ? `<新增 '${searchText}...'>` : '<新增成員>'} />
      </ListItem>
      <Divider />
    </React.Fragment>
  );

  const renderListItem = ({
    handleItemClick,
  }, value) => (
    <MemberListItem
      key={value.id}
      member={value}
      labels={value.labels}
      onClick={handleItemClick}
    />
  );

  return {
    searchText,
    setSearchText,
    renderAddItem,
    renderListItem,
    dialogInputProps: {
      renderAddItem,
      renderListItem,
      dialogProps: {
        onSearchTextChange,
        onStartSearch,
        onFinishSearch,
      },
      searchText,
    },
  };
};
