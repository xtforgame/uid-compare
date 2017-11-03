/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import createContext from '../styles/createContext';
import {createTheming} from 'react-jss'
import injectSheet from 'react-jss'

// Creating a namespaced theming object.
const theming = createTheming('__MY_NAMESPACED_THEME__')

const {ThemeProvider} = theming

const styles = theme => ({
  button: {
    background: theme.colorPrimary
  }
})

const theme = {
  colorPrimary: 'green'
}

const Button = ({classes, children}) => (
  <button className={classes.button}>
    {children}
  </button>
)

// Passing namespaced theming object inside injectSheet options.
const StyledButton = injectSheet(styles, { theming })(Button)

const context = createContext();

export default function withRoot(BaseComponent) {
  class WithRoot extends Component {
    constructor(props){
      super(props);
    }
    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
          <div>
            <ThemeProvider theme={theme}>
              <StyledButton>I am a button with green background</StyledButton>
            </ThemeProvider>
            <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
              <BaseComponent {...this.props} />
            </MuiThemeProvider>
          </div>
        </JssProvider>
      );
    }
  }

  return WithRoot;
}
