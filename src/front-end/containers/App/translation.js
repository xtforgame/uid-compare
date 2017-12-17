import { registerTranslationData } from '~/utils/translationManager';

const translationData = {
  defaultMessages: {
    greetText: 'Hi, user.',
    appTitle: '<Title>',
    login: 'Login',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
  },
  translation: {
    de: {
      greetText: 'Hallo {user}.',
      appTitle: '<Titel>',
      login: 'Anmeldung',
      logout: 'Abmeldung',
      username: 'Benutzername',
      password: 'Passwort',
    },
    en: {
      greetText: 'Hi, {user}.',
      appTitle: '<Title>',
      login: 'Login',
      logout: 'Logout',
      username: 'Username',
      password: 'Password',
    },
    ja: {
      greetText: '{user}さん、こんにちは。',
      appTitle: '<タイトル>',
      login: 'ログイン',
      logout: 'ログアウト',
      username: 'ユーザー名',
      password: 'パスワード',
    },
    'zh-CN': {
      greetText: '早上好，{user}。',
      appTitle: '<标题>',
      login: '登录',
      logout: '登出',
      username: '用户名',
      password: '密码',
    },
    'zh-TW': {
      greetText: '你好，{user}。',
      appTitle: '<標題>',
      login: '登入',
      logout: '登出',
      username: '使用者名稱',
      password: '密碼',
    },
  },
};

const t = registerTranslationData('app.containers.App', translationData);
export const messages = t.messages;
