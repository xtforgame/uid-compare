// import InputLinker from 'azrmui/utils/InputLinker';
import {
  FormCheckboxPreset,
  translateLabel,
  addOnPressEnterEvent,
} from 'azrmui/utils/InputLinker/helpers';

import {
  createSimpleAccountInput,
  createNonemptyPasswordInput,
} from './inputConfigs';

export default (defaultRememberMe = false) => [
  createSimpleAccountInput(),
  createNonemptyPasswordInput(),
  {
    name: 'rememberMe',
    presets: [FormCheckboxPreset, translateLabel('rememberMe'), addOnPressEnterEvent('handleSubmit')],
    props: { dense: 'true', color: 'primary' },
    defaultValue: defaultRememberMe || false,
  },
];
