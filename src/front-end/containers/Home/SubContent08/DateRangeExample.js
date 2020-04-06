/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormDialogInput from 'azrmui/core/FormInputs/FormDialogInput';
import {
  getDateDisplayFuncFromProps,
} from 'azrmui/core/FormInputs/FormDateTimePicker/utils';
import RangeDialog from 'azrmui/core/Range/RangeDialog';
import DateRange from 'azrmui/core/Range/DateTime/DateRange';
import {
  normalizeDateTime,
  getDateRangeDisplayFunc,
} from 'azrmui/core/Range/DateTime/utils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
}));

export default (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  return (
    <FormDialogInput
      label="DateRange"
      value={value}
      displayValue={getDateRangeDisplayFunc(getDateDisplayFuncFromProps(props))}
      onChange={setValue}
      buttonProps={{
        fullWidth: true,
      }}
      renderDialog={({
        label,
        title,
        open,
        handleClose,
        value,
        dialogProps,
      }) => (
        <RangeDialog
          title={title != null ? title : label}
          normalize={normalizeDateTime}
          open={open}
          onClose={handleClose}
          value={value}
          RangeInput={DateRange}
          {...dialogProps}
        />
      )}
    />
  );
};
