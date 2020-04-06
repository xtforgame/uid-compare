import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import ProgressWithMask from 'azrmui/core/Progress/ProgressWithMask';
import createCommonStyles from 'azrmui/styles/common';
import MainAppBar from './MainAppBar';

const styles = theme => ({
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
  container: {
    // margin: 5,
    width: '100%',
    height: '100%',
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
  media: {
    position: 'relative',
    height: 150,
  },
  ...createCommonStyles(theme, ['flex', 'appBar']),
});

class MainFrame extends React.PureComponent {
  renderMainContent() {
    const {
      routeView,
      push,
      classes,
    } = this.props;

    return (
      <React.Fragment>
        <MainAppBar />
        <div className={classes.appBarPlaceholder}>DDDD</div>
        {routeView}
      </React.Fragment>
    );
  }

  render() {
    const {
      classes,
    } = this.props;

    const userLoaded = true;
    const loadUserError = null;

    return (
      <div className={classes.verticalFlexContainerFWFH}>
        {(userLoaded && !loadUserError) && this.renderMainContent()}
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
  }
}

const mapStateToProps = createStructuredSelector({
});

export default compose(
  connect(
    mapStateToProps,
    { push }
  ),
  withStyles(styles),
)(MainFrame);
