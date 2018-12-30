/* eslint-disable react/prop-types, react/forbid-prop-types, jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { readFile } from '~/utils/imageHelpers';

const styles = theme => ({
  input: {
    display: 'none',
  },
});

const FormFileInput = (props) => {
  const {
    id,
    classes,
    accept,
    onLoadEnd = () => {},
    onChange = () => {},
    children,
    inputProps,
    labelProps,
  } = props;
  return (
    <React.Fragment>
      <input
        {...inputProps}
        accept={accept}
        className={classes.input}
        id={id}
        type="file"
        onChange={(e) => {
          onChange(e);
          if (e.target.files[0]) {
            readFile(e.target.files[0])
            .then((imgInfo) => {
              onLoadEnd(imgInfo);
            });
          }
        }}
      />
      <label
        {...labelProps}
        htmlFor={id}
      >
        {children}
      </label>
    </React.Fragment>
  );
};

FormFileInput.propTypes = {
  id: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
)(FormFileInput);
