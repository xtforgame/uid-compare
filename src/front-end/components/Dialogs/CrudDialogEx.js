/* eslint-disable react/no-multi-comp */

import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import MuiList from '@material-ui/core/List';
import SwipeableViews from 'react-swipeable-views';
import CrudDialog from '~/components/Dialogs/CrudDialog';
import createCommonStyles from '~/styles/common';

const styles = theme => ({
  ...createCommonStyles(theme, ['flex']),
});

class CrudDialogEx extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formKey: 0,
      viewIndex: props.withoutList ? 1 : 0,
      editingSource: null,
    };
  }

  handleItemClick = (value) => {
    const {
      picker,
      // editor,
    } = this.props;

    if (picker) {
      if (this.props.onClose) {
        this.props.onClose(value);
      }
    } else {
      this.setState({
        formKey: this.state.formKey + 1,
        viewIndex: 1,
        editingSource: value,
      });
    }
  };

  startCreate = otherEditingParams => this.setState({
    viewIndex: 1,
    editingSource: null,
    formKey: this.state.formKey + 1,
    otherEditingParams,
  });

  switchToList = () => this.setState({
    viewIndex: 0,
    editingSource: null,
    // formKey: this.state.formKey + 1,
  });

  cancelCreate = () => {
    if (this.props.withoutList) {
      if (this.props.onClose) {
        this.props.onClose();
      }
    } else {
      this.switchToList();
    }
  }

  handleSubmit = editingParams => (result) => {
    const {
      picker,
      // editor,
      withoutList,
      onSubmit = () => {},
    } = this.props;

    if (!picker && !withoutList) {
      this.switchToList();
    }
    onSubmit(result, editingParams);
  };

  handleSearchTextChange = cbType => (e, ...args) => {
    const searchText = e ? e.target.value : null;
    this.setState({
      searchText,
    });
    const cb = this.props[cbType];
    if (cb) {
      cb(e, ...args);
    }
  };

  render() {
    const {
      classes,
      // onClose,
      selectedValue,

      editingParams: eP = {},

      picker,
      editor,

      List = MuiList,
      listProps,

      list: l,
      applySearchText = () => true,
      renderListItem = (() => undefined),
      renderAddItem = (() => undefined),
      addItemPlacement = 'end',

      CrudForm,
      crudFormProps,

      onSearchTextChange,
      onStartSearch,
      onFinishSearch,
      ...other
    } = this.props;

    const {
      formKey, editingSource, otherEditingParams, searchText
    } = this.state;
    const editingParams = { ...eP, ...otherEditingParams };
    if (editingSource) {
      editingParams.editingSource = editingSource;
    }

    let list = [...l];

    if (searchText) {
      list = list.filter(item => applySearchText(searchText, item));
    }

    const addItem = renderAddItem({
      handleItemClick: this.startCreate,
    });

    return (
      <CrudDialog
        picker={picker}
        editor={editor}
        editingParams={editingParams}
        selectedValue={selectedValue}
        crudFormOpen={!!this.state.viewIndex}
        onBackToList={this.switchToList}

        searchText={searchText || ''}
        onSearchTextChange={this.handleSearchTextChange('onSearchTextChange')}
        onStartSearch={this.handleSearchTextChange('onStartSearch')}
        onFinishSearch={this.handleSearchTextChange('onFinishSearch')}
        {...other}
      >
        <SwipeableViews
          index={this.state.viewIndex}
          {...{}/* onChangeIndex={this.handleChangeIndex} */}
          style={{ flex: 1 }}
          containerStyle={{ height: '100%' }}
          disabled
        >
          <List {...listProps}>
            { addItemPlacement === 'start' && addItem }
            {list.map(
              (...args) => renderListItem({
                handleItemClick: this.handleItemClick.bind(null, args[0]),
              }, ...args)
            )}
            { addItemPlacement === 'end' && addItem }
          </List>
          <div className={classes.verticalFlexContainerFWFH}>
            <CrudForm
              key={formKey}
              {...crudFormProps}
              editingParams={editingParams}
              onDone={this.handleItemClick}
              onCancel={this.cancelCreate}
              onSubmit={this.handleSubmit(editingParams)}
            />
          </div>
        </SwipeableViews>
      </CrudDialog>
    );
  }
}

export default compose(
  withStyles(styles),
)(CrudDialogEx);
