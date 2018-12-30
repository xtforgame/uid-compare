/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle */
import React from 'react';
import classNames from 'classnames';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import SuccessButton from '~/components/Buttons/SuccessButton';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import grey from '@material-ui/core/colors/grey';
import Centered from '~/components/Layout/Centered';
import UserProfileCard from '~/components/Cards/UserProfileCard';
import {
  FormSpace,
  FormFileInput,
} from '~/components/FormInputs';
import {
  createIgnoredPreset,
  FormTextFieldPreset,
  ListItemDisplayerPreset,
  addOnPressEnterEvent,
} from '~/utils/InputLinker/helpers';
import {
  ContainerConfig,
  EditableConfig,
} from '~/components/LinkerPresets/ConfigCreators';
import bgImg from './StockSnap_3FOSIEZDTW.jpg';

import {
  makeMyUserSelector,
} from '~/containers/App/selectors';

import modelMap from '~/containers/App/modelMap';

const {
  patchUser,
} = modelMap.waitableActions;

const styles = theme => ({
  halfHeight: {
    height: '50%',
  },
  spaceAfterMedia: {
    height: 55,
  },
  mainContainer: {
    width: '100%',
  },

  media: {
    position: 'relative',
    height: 150,
  },
  absolute: {
    position: 'absolute',
    top: 0,
  },
  mask: {
    width: '100%',
    height: '100%',
  },
  editBanner: {
    color: theme.palette.common.white,
    margin: 'auto',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 56,
    height: 56,
  },

  avatarContainer: {
    position: 'relative',
    height: '100%',
  },

  editButton: {
    margin: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 8,
  },

  avatar: {
    // margin: 10,
    color: '#fff',
    backgroundColor: grey[500],
  },
  bigAvatar: {
    width: 96,
    height: 96,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    objectFit: 'cover',
  },

  editPhoto: {
    color: theme.palette.common.white,
    margin: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

const createTextInputPreset = (name, label) => ({
  presets: [FormTextFieldPreset, addOnPressEnterEvent('handleSubmit')],
  name,
  extraGetProps: {
    label,
    fullWidth: true,
  },
});

const getFields = classes => [
  new EditableConfig({
    name: 'bannerImg',
    InputComponent: CardMedia,
    converter: {
      fromView: ([v]) => v,
    },
    extraGetProps: (props, { value, handleChange }) => ({
      ...props,
      className: classes.media,
      image: value,
      title: '',
      children: [<div key="space" className={classes.halfHeight} />],
    }),
    extraChildElements: [
      new ContainerConfig([
        new EditableConfig({
          presets: [createIgnoredPreset(Button)],
          extraGetProps: (props, { link: { host } }) => ({
            ...props,
            variant: 'fab',
            className: classes.editButton,
          }),
        },
        null, (props, { link: { host } }) => ({
          ...props,
          color: 'secondary',
          'aria-label': 'edit',
          onClick: host.startEditing,
          children: <EditIcon />,
        }),
        null, (props, { link: { host } }) => ({
          ...props,
          color: 'default',
          'aria-label': 'cancel',
          onClick: host.cancelEditing,
          children: <CloseIcon />,
        })),
        new EditableConfig({
          name: 'avatarImg',
          InputComponent: Avatar,
          converter: {
            fromView: ([v]) => v,
          },
          extraGetProps: (props, { value }) => ({
            ...props,
            className: classNames(classes.avatar, classes.bigAvatar),
            children: [
              <img key="avatar-img" alt="me" src={value} className={classes.avatarImage} />,
            ],
          }),
        }, () => Avatar, null, null, (props, { handleChange }) => ({
          ...props,
          children: props.children.concat([
            <div
              key="avatar-mask"
              className={classNames(classes.absolute, classes.mask)}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
            />,
            <FormFileInput
              key="avatar-input"
              id="avatar-input"
              accept="image/*"
              onLoadEnd={(fileInfo) => {
                handleChange(fileInfo.dataURL);
              }}
            >
              <IconButton component="span" className={classNames(classes.editPhoto)}>
                <PhotoCamera />
              </IconButton>
            </FormFileInput>,
          ]),
        })),
      ], {
        getInputComponent: () => Centered,
        extraGetProps: { className: classes.avatarContainer },
      }, () => undefined),
    ],
  }, null, null, null, (props, { value, handleChange }) => ({
    ...props,
    className: classes.media,
    image: value,
    title: '',
    children: props.children.concat([
      <div
        key="avatar-mask"
        className={classNames(classes.absolute, classes.mask)}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
      />,
      <FormFileInput
        key="avatar-input"
        id="icon-button-file"
        accept="image/*"
        onLoadEnd={(fileInfo) => {
          handleChange(fileInfo.dataURL);
        }}
      >
        <IconButton component="span" className={classNames(classes.editBanner)}>
          <PhotoCamera />
        </IconButton>
      </FormFileInput>,
    ]),
  })),
  {
    presets: [createIgnoredPreset('div')],
    extraGetProps: { className: classes.spaceAfterMedia },
  },
  new ContainerConfig([
    new ContainerConfig([
      new EditableConfig(createTextInputPreset('name', 'Name'), () => Centered, (props, { value, link: { name, hostProps } }) => ({
        key: props.key,
        children: (
          <Typography gutterBottom variant="h5" component="h2">
            {hostProps.defaultValues[name]}
          </Typography>
        ),
      })),
      new EditableConfig(
        new ContainerConfig([
          new EditableConfig(createTextInputPreset('email', 'Email'), () => ListItem, ListItemDisplayerPreset),
          new EditableConfig(createTextInputPreset('bio', 'Bio'), () => ListItem, ListItemDisplayerPreset, null, p => ({
            ...p,
            multiline: true,
            rows: 1,
            rowsMax: 10,
          })),
        ]),
        () => List, null, () => React.Fragment
      ),
    ], { InputComponent: CardContent }),
  ]),
  new EditableConfig(
    { presets: [createIgnoredPreset(FormSpace)] },
    () => React.Fragment, null,
    null, props => ({ ...props, variant: 'content2' })
  ),
  new EditableConfig(
    new ContainerConfig([
      new EditableConfig(
        createIgnoredPreset(SuccessButton),
        () => React.Fragment, ({ key }) => ({ key }),
        null, (props, { link: { host } }) => ({
          ...props,
          size: 'small',
          variant: 'contained',
          fullWidth: true,
          color: 'primary',
          onClick: host.handleSubmit,
          children: 'Save',
        })
      ),
    ]),
    () => React.Fragment, null, () => CardActions
  ),
];

class Profile extends React.PureComponent {
  state = { editing: false };

  submit = (values) => {
    const {
      patchUser,
      user = {},
    } = this.props;

    let p = Promise.resolve();

    if (user.id != null) {
      const patchData = {};
      if (values.name) {
        patchData.name = values.name;
      }
      if (values.email) {
        patchData.data = {
          ...user.data,
          ...patchData.data,
          email: values.email,
        };
      }
      if (values.bio) {
        patchData.data = {
          ...user.data,
          ...patchData.data,
          bio: values.bio,
        };
      }
      if (values.avatarImg) {
        patchData.picture = values.avatarImg;
      }
      p = patchUser(user.id, patchData);
    }
    p.then(() => {
      this.setState({
        editing: false,
      });
    })
    .catch((e) => {
      console.error('Failed to update user info :', e);
    });
  }

  render() {
    const {
      classes,
      user,
    } = this.props;

    const { editing } = this.state;

    const {
      name,
      picture: avatarImg,
      data: {
        bio,
        email,
      } = {},
    } = user || {};

    return (
      <Centered className={classes.mainContainer}>
        <UserProfileCard
          user={user}
          bgImg={bgImg}
          fields={getFields(classes)}
          defaultValues={{
            name,
            bannerImg: bgImg,
            avatarImg,
            bio,
            email,
          }}
          editing={editing}
          onStartEditing={() => this.setState({ editing: true })}
          onCancelEditing={() => this.setState({ editing: false })}
          onSubmit={this.submit}
        />
      </Centered>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeMyUserSelector(),
});

export default compose(
  connect(mapStateToProps, {
    patchUser,
  }),
  withStyles(styles),
)(Profile);
