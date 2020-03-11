import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import { FormTextField, FormSpace, FormImagesInput } from '~/components/FormInputs';
import { createHandleUploadFunction, isImageUploaded, arrayUpdate } from '~/components/FormInputs/FormImagesInput';
import EditorDialog from './EditorDialog';
import useDialogState, { Cancel } from '~/hooks/useDialogState';

const useStyles = makeStyles(theme => ({
}));

const handleUpload = createHandleUploadFunction('/api/files');

export default (props) => {
  const {
    editingParams: {
      defaultText,
      editingSource,
    },
    // onDone,
    // onCancel,
    editorDialogProps: dp1,
    onSubmit,
  } = props;

  const [text, setText] = useState((editingSource && editingSource.text) || defaultText);
  const [imageInfos, setImageInfos] = useState((editingSource && editingSource.imageInfos) || []);
  const [editingImageInfo, setEditingImageInfo] = useState(null);

  const [{
    // open,
    exited,
    dialogProps: dp2,
  }, {
    handleOpen,
    // handleClose,
    // handleExited,
  }] = useDialogState({
    open: (imageInfo, index) => {
      setEditingImageInfo({
        imageInfo,
        index,
      });
    },
    close: (v) => {
      if (v !== undefined && v !== Cancel) {
        const { index } = (editingImageInfo || {});
        if (index != null) {
          setImageInfos(arrayUpdate(imageInfos, index, v));
        }
      }
      setEditingImageInfo(null);
    },
  });

  const dialogProps = { ...dp1, ...dp2 };

  const submit = () => {
    const ifs = [...(imageInfos || [])];
    let loaded = true;
    for (let index = 0; index < ifs.length; index++) {
      const imageInfo = ifs[index];
      if (!isImageUploaded(imageInfo)) {
        loaded = false;
        break;
      }
      const { imageUploadInfo, ...rest } = imageInfo;
      ifs[index] = ({
        ...rest,
        image: {
          ...rest.image,
          imgUrl: `./api/files/${rest.image.hash}`,
        },
      });
    }
    if (!loaded) {
      alert('wait for upload');
      return false;
    }
    return onSubmit({
      ...editingSource,
      text: text || '',
      imageInfos: (imageInfos || []).map(({ imageUploadInfo, ...rest }) => ({
        ...rest,
        image: {
          ...rest.image,
          imgUrl: `./api/files/${rest.image.hash}`,
        },
      })),
    });
  };

  return (
    <DialogContent>
      <FormSpace variant="content2" />
      <FormTextField
        label="Text"
        value={text || ''}
        onPressEnter={submit}
        onChange={e => setText(e.target.value)}
        autoFocus
        // margin="dense"
        fullWidth
      />
      <FormSpace variant="content2" />
      <FormImagesInput
        id="images"
        label="Images"
        value={imageInfos}
        onChange={setImageInfos}
        onAdd={(imageInfo, { context }) => {
          context.uploadImage(imageInfo);
          setImageInfos(imageInfos => imageInfos.concat([imageInfo]));
        }}
        onEdit={(imageInfo, i, op) => {
          handleOpen(imageInfo, i);
          // setImageInfos(arrayUpdate(imageInfos, i, {
          //   ...imageInfo,
          //   image: {
          //     ...imageInfo.image,
          //     imgUrl: '',
          //   },
          // }));
        }}
        getContent={imageInfo => (
          <button
            type="button"
          >
            {imageInfo.content}
          </button>
        )}
        fullWidth
        handleUpload={handleUpload}
      />
      <FormSpace variant="content2" />
      <Button
        variant="contained"
        onClick={submit}
      >
        Submit
      </Button>
      {(!exited) && (
        <EditorDialog
          value={editingImageInfo && editingImageInfo.imageInfo}
          {...dialogProps}
        />
      )}
    </DialogContent>
  );
};
