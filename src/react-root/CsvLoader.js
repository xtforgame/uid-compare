import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import FileLoader from './FileLoader';

export default (props) => {
  const {
    id,
    label = '選擇檔案',
    value = null,
    onChange = () => {},
  } = props;

  console.log('value :', value);

  return (
    <React.Fragment>
      <FileLoader
        id={id}
        accept=".csv"
        inputProps={{
          disabled: !!value,
        }}
        onLoadEnd={(uploadInfo) => {
          onChange(uploadInfo);
          // const searchRegex = /data:(.*);base64,([a-zA-Z0-9+/=]*)/g;
          // const dataUrlRegexResult = searchRegex.exec(uploadInfo.dataURL || '');

          // if (dataUrlRegexResult) {
          //   console.log('typeof atob(dataUrlRegexResult[2]) :', typeof atob(dataUrlRegexResult[2]));
          //   console.log('atob(dataUrlRegexResult[2]) :', atob(dataUrlRegexResult[2]));
          // }
        }}
      >
        {!value && (
          <div style={{ cursor: 'pointer' }}>
            {label}
          </div>
        )}
      </FileLoader>
      {value && (
        <Button
          style={{ color: 'blue' }}
          onClick={(e) => {
            e.stopPropagation();
            onChange();
          }}
        >
          已選取(點此可以取消選取)：
          {value && value.fileName}
        </Button>
      )}
    </React.Fragment>
  );
};
