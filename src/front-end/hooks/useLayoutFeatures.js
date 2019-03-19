import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInputLinker } from '~/utils/InputLinker';
import useStylesByNs from '~/styles/useStylesByNs';
import {
  propagateOnChangeEvent,
} from '~/utils/InputLinker/helpers';

export const defaultIlOnInit = props => (il) => {
  const {
    fields,
    defaultValues,
  } = props;

  il.add(...(fields.map(field => ({
    presets: [field, propagateOnChangeEvent()],
  }))));

  il.setDefaultValues(defaultValues || {});
};

export default (props, ilOnInit) => {
  const {
    namespace,
    ignoredUndefinedFromOutputs,

    i18nNs,
    styleNs,
    onInited = () => undefined,
    onDidMount = () => undefined,
    onSubmit = () => undefined,
  } = props;

  const tData = useTranslation(i18nNs);
  const classes = useStylesByNs(styleNs);

  const createInitFunc = firstTime => (il) => {
    (ilOnInit || defaultIlOnInit(props))(il);
    if (firstTime) {
      onInited(il);
    }
  };

  const [il, resetInputLinker] = useInputLinker(
    {/* props */},
    { namespace, ignoredUndefinedFromOutputs },
    createInitFunc(true),
  );

  const resetIl = (host, options) => {
    Object.values(il.fieldMap).forEach((f) => {
      f.setValue(f.defaultValue);
      f.setError();
    });
    const newIl = resetInputLinker(host, options, createInitFunc());
    return newIl;
  };

  const host = {
    handleSubmit: () => {
      if (il.validate()) {
        const outputs = il.getOutputs();
        onSubmit(outputs, il);
        return {
          outputs,
          linker: il,
        };
      }
      return null;
    },
    props: { ...props, classes },
  };

  useEffect(() => { onDidMount(il); }, []);

  return {
    il,
    resetIl,
    classes,
    tData,
    host,
  };
};
