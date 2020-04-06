import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  placeholder: {
    height: 40,
  },
  mainContainer: {
    margin: 8,
    [theme.breakpoints.up('sm')]: {
      margin: 40,
    },
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  cardWrapper: {
    margin: 8,
  },
  icon: {
    fontSize: 24,
  },
  listFull: {
    width: 'auto',
  },
});

class AdminPages extends React.PureComponent {
  render() {
    const {
      routeView, classes,
    } = this.props;

    return (
      <div className={classes.mainContainer}>
        { routeView }
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      greetName: state.global.greetName,
    }),
  ),
  withTranslation(['app-common']),
  withStyles(styles),
)(AdminPages);
