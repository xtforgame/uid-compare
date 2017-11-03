import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import {
  greet,
} from './actions';
import {
  withRouter,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import formatMessage from '~/utils/formatMessage';
import messages from './messages';
import { ConnectedRouter } from 'react-router-redux';
import { changeLocale } from '~/containers/LanguageProvider/actions';
import { makeSelectLocale } from '~/containers/LanguageProvider/selectors';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../components/withRoot';

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
});

let App = ({ history, pathname, routes, locale, intl, changeLocale, greetName }) => (
  <ConnectedRouter history={history}>
    {routes}
  </ConnectedRouter>
);

const mapStateToProps = createSelector(
  makeSelectLocale(),
  state => state.get('global').greetName,
  state => state.get('router').location && state.get('router').location.pathname,
  (locale, greetName, pathname) => ({ locale, greetName, pathname })
);

export function mapDispatchToProps(dispatch) {
  return {
    changeLocale: (event) => dispatch(changeLocale(event.target.value)),
    dispatch,
  };
}

export default compose(
  withRoot,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withStyles(styles),
)(App);
