import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ConnectedRouter } from 'connected-react-router';
import useStylesByNs from '~/styles/useStylesByNs';
import withRoot from '../../components/withRoot';

import {
  makeUiThemeSelector,
} from './selectors';

const AppInternal = ({ history, routes }) => {
  useStylesByNs(['global']);
  return (
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  );
};

const AppWithTheme = compose(
  withRoot,
)(AppInternal);

const App = props => (
  <AppWithTheme
    {...props}
    uiTheme={props.uiTheme}
  />
);

const mapStateToProps = createStructuredSelector({
  uiTheme: makeUiThemeSelector(),
});

export default compose(
  connect(mapStateToProps),
)(App);
