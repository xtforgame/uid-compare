import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import FormDialogInput from 'azrmui/core/FormInputs/FormDialogInput';
import CrudDialogEx from 'azrmui/core/Dialogs/CrudDialogEx';
import MemberListItem from './shared/MemberListItem';
import getMemberIdentifier from './shared/getMemberIdentifier';

const useStyles = makeStyles(theme => ({
}));

export default (props) => {
  const {
    picker,
    editor,
    dialogProps,
    users,
    isReady,
    onSubmit,
    value,
    onChange,
    CrudForm,
    searchText,

    renderAddItem,
    renderListItem,
  } = props;

  const classes = useStyles();

  const renderAddItemFunc = renderAddItem || (({
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
  ));

  const renderListItemFunc = renderListItem || (({
    handleItemClick,
  }, value) => (
    <MemberListItem
      key={value.id}
      member={value}
      labels={value.labels}
      onClick={handleItemClick}
    />
  ));

  return (
    <FormDialogInput
      label="編輯成員"
      value={value}
      displayValue={(value) => {
        if (!value) {
          return '<未選取>';
        }
        let displayValue = value.name;
        const identifier = getMemberIdentifier(value);
        if (identifier) {
          displayValue = `${displayValue}(${identifier})`;
        }
        return displayValue;
      }}
      // renderButton={({ buttonProps }) => (
      //   <Button
      //     variant="contained"
      //     color="primary"
      //     disabled={!isReady}
      //     {...buttonProps}
      //   >
      //     編輯成員
      //   </Button>
      // )}
      buttonProps={{
        color: 'primary',
        disabled: !isReady,
        margin: 'dense',
        fullWidth: true,
      }}
      onChange={onChange}
      // buttonProps={{
      //   fullWidth: true,
      // }}
      dialogProps={dialogProps}
      renderDialog={({
        label,
        title,
        open,
        handleClose,
        value,
        dialogProps,
      }) => (
        <CrudDialogEx
          picker={picker}
          editor={editor}
          list={users}
          addItemPlacement="start"
          renderAddItem={renderAddItemFunc}
          renderListItem={renderListItemFunc}
          CrudForm={CrudForm}
          value={value}
          onSubmit={onSubmit}
          texts={{
            edit: '編輯成員',
            create: '新增成員',
            pick: '選擇成員',
          }}
          {...dialogProps}
        />
      )}
    />
  );
};
