
/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle */
/* eslint-disable react/prop-types, react/forbid-prop-types, jsx-a11y/label-has-associated-control */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { promiseReduce } from 'azrmui/common/utils';

const styles = theme => ({
  input: {
    display: 'none',
  },
});


export function processFile(data, file, options = {}) {
  const fileName = file.name;
  const fileType = file.type;

  const result = {
    file,
    fileName,
    fileType,
    data,
  };

  return Promise.resolve(result);
}

export const readFile = (file, options = {}) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    // console.log('reader.result, file :', reader.result, file);
    processFile(reader.result, file, options).then(resolve, reject);
  };

  reader.onerror = () => {
    reject(new Error('There was an error reading the file!'));
  };

  reader.readAsText(file);
});

const AddImageButton = (props) => {
  const {
    id,
    classes,
    accept,
    onLoadEnd = () => {},
    onChange = () => {},
    children,
    inputProps,
    labelProps,
    readFileOption = {},
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
          const files = Array.from(e.target.files);
          promiseReduce(files, (_, file) => readFile(file, readFileOption)
          .then((imgInfo) => {
            onLoadEnd(imgInfo);
          }));
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

export default withStyles(styles)(AddImageButton);
