/* eslint-disable flowtype/require-valid-file-annotation, no-underscore-dangle */
// https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/AppWrapper.js
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import getPageContext, { updatePageContext } from '~/styles/getPageContext';
import { ThemeProvider as NativeThemeProvider, getTheme } from '~/styles/NativeTheme';

export default function withRoot(BaseComponent) {
  class WithRoot extends React.PureComponent {
    constructor(...args) {
      super(...args);
      this.state = {
        prevProps: {
          uiTheme: {
            ...this.props.uiTheme,
          },
        },
      };
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    static getDerivedStateFromProps(props, prevState) {
      if (typeof prevState.pageContext === 'undefined') {
        return {
          prevProps: props,
          pageContext: props.pageContext || getPageContext(props.uiTheme),
          nativeTheme: getTheme(props.uiTheme),
        };
      }

      const { prevProps } = prevState;

      if (
        props.uiTheme.paletteType !== prevProps.uiTheme.paletteType
        || props.uiTheme.direction !== prevProps.uiTheme.direction
      ) {
        return {
          prevProps: props,
          pageContext: updatePageContext(props.uiTheme),
          nativeTheme: getTheme(props.uiTheme),
        };
      }

      return null;
    }

    render() {
      const { pageContext, nativeTheme } = this.state;
      console.log('nativeTheme :', nativeTheme);
      return (
        <StylesProvider
          generateClassName={pageContext.generateClassName}
          jss={pageContext.jss}
          sheetsManager={pageContext.sheetsManager}
          sheetsRegistry={pageContext.sheetsRegistry}
        >
          {/* StylesProvider can be removed now? */}
          <NativeThemeProvider theme={nativeTheme}>
            <ThemeProvider theme={pageContext.theme}>
              <React.Fragment>
                <CssBaseline />
                <BaseComponent {...this.props} />
              </React.Fragment>
            </ThemeProvider>
          </NativeThemeProvider>
        </StylesProvider>
      );
    }
  }

  return WithRoot;
}
