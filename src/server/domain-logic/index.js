import drawIcon from '~/utils/drawIcon';

export const createInitialUserSettingsData = () => ([
  {
    type: 'general',
    data: {},
  },
  {
    type: 'preference',
    data: {
      uiTheme: {
        direction: 'ltr',
        paletteType: 'light',
      },
    },
  },
]);

export const createInitialUserData = ({
  id,
  name,
  username,
  password,
  privilege = 'user',
  picture,
  data,
}, extraColumns) => ({
  id,
  name,
  username,
  password,
  privilege,
  picture: picture || `data:png;base64,${drawIcon(name).toString('base64')}`,
  data: data || {
    bio: `I'm ${name}`,
    email: null,
  },
  userSettings: createInitialUserSettingsData(),
  ...extraColumns,
});
