import React from 'react';
import classnames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import EditorDrawer from './EditorDrawer';
import { useConnect } from 'azrmui/hooks/redux-react-hook-ex';
import ProgressWithMask from 'azrmui/core/Progress/ProgressWithMask';
import createCommonStyles from 'azrmui/styles/common';
import { drawerWidth } from './constants';
import MainAppBar from './MainAppBar';
import SubContent01 from './SubContent01';

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = { push };

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  fab: {
    position: 'absolute',
    // bottom: theme.spacing(2),
    right: theme.spacing(2),

    // https://stackoverflow.com/questions/8508275/how-to-center-a-position-absolute-element
    top: '50%',
    transform: 'translate(0, -50%)',
  },
  mainContent: {
    // margin: 5,
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      // margin: 40,
      // width: 1200,
    },
  },
  ...createCommonStyles(theme, ['flex', 'appBar']),
}));

export default (props) => {
  const {
    routeView,
  } = props;

  const classes = useStyles();
  /* const { push } = */ useConnect(mapStateToProps, mapDispatchToProps);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const renderMainContent = () => (
    <React.Fragment>
      <div
        style={{
          position: 'relative', display: 'flex', overflowX: 'hidden', width: '100%', height: '100%',
        }}
      >
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: open,
          })}
          style={{
            position: 'relative', overflowX: 'hidden', flex: 1, height: '100%',
          }}
        >
          <MainAppBar
            className={classnames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          />
          <div className={classes.appBarPlaceholder}>DDDD</div>
          <SubContent01 />
          {/* {routeView} */}
        </div>
        <EditorDrawer
          open={open}
          setOpen={setOpen}
        />
        <Fab
          aria-label="edit-drawer"
          className={classes.fab}
          color="primary"
          onClick={handleDrawerOpen}
        >
          <EditIcon />
        </Fab>
      </div>
    </React.Fragment>
  );

  const userLoaded = true;
  const loadUserError = null;

  return (
    <div className={classes.verticalFlexContainerFWFH}>
      {(userLoaded && !loadUserError) && renderMainContent()}
      <Fade
        in={!userLoaded && !loadUserError}
        timeout={{
          enter: 0,
          exit: 200,
        }}
        unmountOnExit
      >
        <ProgressWithMask
          backgroundColor="#FFFFFF"
          zIndex={1101}
          delay={0}
        />
      </Fade>
    </div>
  );
};
