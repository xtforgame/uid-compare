/* eslint-disable flowtype/require-valid-file-annotation */

import { create } from 'jss';
import { SheetsRegistry } from 'react-jss';
import preset from 'jss-preset-default';
import { createMuiTheme, createTypography, createPalette } from 'material-ui/styles';
import { purple, green, blue, black, pink } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

// const theme = createMuiTheme({
//   palette: {
//     primary: purple,
//     secondary: green,
//   },
// });

export function getTheme(theme) {
  return createMuiTheme({
    direction: theme.direction,
    typography: {
      fontFamily: `"Noto Sans TC", "Noto Sans SC", "Noto Sans JP", "Roboto", sans-serif`,
    },
    palette: {
      primary: theme.paletteType === 'dark' ? black : blue,
      secondary: pink,
      type: theme.paletteType,
    },
  });
}

const theme = getTheme({
  direction: 'ltr',
  // paletteType: 'light',
  paletteType: 'dark',
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export const sheetsManager = new Map();

export default function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}
