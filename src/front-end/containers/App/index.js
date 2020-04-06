import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ConnectedRouter } from 'connected-react-router';
import useStylesByNs from 'azrmui/styles/useStylesByNs';
import ThemeContainer from '~/containers/core/ThemeContainer';

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

const App = props => (
  <ThemeContainer uiTheme={props.uiTheme}>
    <AppInternal {...props} />
  </ThemeContainer>
);

const mapStateToProps = createStructuredSelector({
  uiTheme: makeUiThemeSelector(),
});

export default compose(
  connect(mapStateToProps),
)(App);
