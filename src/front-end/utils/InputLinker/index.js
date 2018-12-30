/* eslint-disable no-underscore-dangle, react/no-this-in-sfc */
import React from 'react';

export class Converter {
  constructor(convertFuncMap = {}) {
    this.fromView = convertFuncMap.fromView || (([event]) => event.target.value);
    this.toView = convertFuncMap.toView || (value => value || '');
    this.toOutput = convertFuncMap.toOutput || (value => value);
  }
}

export const toArray = value => (Array.isArray(value) ? value : [value].filter(i => i));

export class FieldLink {
  constructor(linker, config) {
    this.linker = linker;
    this.config = config;
    this.childLinks = [];
    this.childElements = [];
    this._host = this.linker.component;
    this.namespace = this.linker.namespace;
    this.name = config.name;
    this.uniqueName = this.namespace ? `${this.namespace}-${this.name}` : this.name;
    this.key = this.uniqueName;
    this.defaultValue = config.defaultValue;
    this.InputComponent = config.InputComponent;
    this._getInputComponent = config.getInputComponent;
    this.ignoredFromOutputs = config.ignoredFromOutputs;
    this.mergeChildren = config.mergeChildren || ((children, childrenElements) => children.concat(childrenElements));
    this.options = config.options || {};

    this.handledByProps = config.handledByProps && { ...config.handledByProps };
    if (this.handledByProps) {
      if (!this.handledByProps.value || !this.handledByProps.onChange) {
        throw new Error('Wrong options: handledByProps');
      }
      if (typeof this.handledByProps.value === 'string') {
        const valueProp = this.handledByProps.value;
        this.handledByProps.value = ({ link: { hostProps } }, options = {}) => hostProps[valueProp];
      }

      if (typeof this.handledByProps.onChange === 'string') {
        const onChangeProp = this.handledByProps.onChange;
        this.handledByProps.onChange = ({ value, rawArgs }, { link, link: { hostProps } }, options = {}) => {
          this.host.setState(this.linker._getUpdatedStateForResetError(this.name));
          if (hostProps[onChangeProp]) {
            hostProps[onChangeProp](value, rawArgs, link);
          }
        };
      } else {
        const { onChange } = this.handledByProps;
        this.handledByProps.onChange = ({ value, rawArgs }, { link, link: { hostProps } }, options = {}) => {
          this.host.setState(this.linker._getUpdatedStateForResetError(this.name));
          if (onChange) {
            onChange(value, rawArgs, link);
          }
        };
      }
    }

    this.converter = new Converter(config.converter);

    this._validate = config.validate;
    this._getPropsMiddlewares = toArray(config.getProps);
    this.props = config.props;
    this.data = config.data;

    this.onChange = config.onChange || (() => {});
    this.onValidateError = config.onValidateError || (() => {});

    this.getVisibility = config.getVisibility || (() => true);

    // functions
    const linkInfo = { link: this };

    this.getValue = targetState => this.linker.getValueFromState(this.name, targetState);
    this.setValue = value => this.host.setState(this.linker._getUpdatedState(this.name, value));
    this.getCustomState = targetState => this.linker.getCustomStateFromState(this.name, targetState);
    this.setCustomState = value => this.host.setState(this.linker.getMergedCustomState({ [this.name]: value }));
    this.getOutput = targetState => this.converter.toOutput(this.getValue(targetState), { ...linkInfo });
    this.getViewValue = targetState => this.converter.toView(this.getValue(targetState), { ...linkInfo });
    this.validate = targetState => this._validate(this.getValue(targetState), { ...linkInfo });

    if (this.handledByProps) {
      this.getValue = () => this.handledByProps.value({ link: this }, {});
      this.setValue = (value, rawArgs) => this.handledByProps.onChange({ value, rawArgs }, { link: this }, {});
    }
  }

  addChildLink(...children) {
    this.childLinks.push(...children);
  }

  addChildElement(...children) {
    this.childElements.push(...children);
  }

  // handlers
  handleChange = (...rawArgs) => {
    const storedValue = this.getValue();
    const linkInfo = { storedValue, link: this };
    const value = this.converter.fromView(rawArgs, linkInfo);
    this.onChange(value, rawArgs, linkInfo);
    this.setValue(value, rawArgs);
  };

  getProps = (initProps, linkInfo, options, middlewares) => (middlewares || this._getPropsMiddlewares).reduce(
    (props, m) => (typeof m === 'function' ? m(props, linkInfo, options) : { ...props, ...m }),
    initProps
  );

  get host() { return this._host; }

  get hostProps() { return this.host.props; }

  get hostState() { return this.host.state; }

  getInputComponent = (extraLinkInfo) => {
    const { InputComponent, _getInputComponent } = this;
    if (!InputComponent && !_getInputComponent) {
      throw new Error(`No InputComponent or getInputComponent provided :${this.name}`);
    }
    return _getInputComponent ? _getInputComponent({ link: this, ...extraLinkInfo }) : InputComponent;
  };
}

export default class InputLinker {
  constructor(component, options = {}) {
    this.component = component;
    this.namespace = options.namespace || '';
    this.fieldStateName = options.fieldStateName || 'fields';
    this.fieldCustomStateName = options.fieldCustomStateName;
    this.fieldErrorStateName = options.fieldErrorStateName || 'errors';
    this.presets = options.presets || {};
    this.ignoredUndefinedFromOutputs = options.ignoredUndefinedFromOutputs;
    this.FieldLink = options.FieldLink || FieldLink;
    this.fieldLinks = [];
    this.fieldMap = {};
    this._idCounter = 0;
  }

  getUniqueName = () => (this.namespace ? `${this.namespace}-unnamed-${++this._idCounter}` : `unnamed-${++this._idCounter}`);

  getPreset = preset => (typeof preset === 'string' ? this.presets[preset] : preset);

  evaluateConfig = ({ config: currentCfg, lastQueue = [] }, c) => {
    let config;
    if (typeof c === 'function') {
      config = c(currentCfg);
    } else {
      config = currentCfg;
      const {
        preset, presets, evaluate = _config => ({ ..._config, ...c }), middlewares: { before, after, last } = {},
      } = c;

      const addLast = (c) => {
        if (last) {
          lastQueue.unshift(last);
        }
        return c;
      };

      ({ config } = toArray(before)
        .concat(toArray(preset)).concat(toArray(presets)).concat(toArray(evaluate))
        .concat([addLast])
        .concat(toArray(after))
          .map(this.getPreset)
          .reduce(this.evaluateConfig, { config, lastQueue }));

      delete config.preset;
      delete config.presets;
      delete config.evaluate;
      delete config.middlewares;
    }
    if (!config) {
      console.error('Wrong config', c);
      throw new Error('Wrong config');
    }
    config.getProps = toArray(config.getProps);
    if (config.extraGetProps) {
      config.extraGetProps = toArray(config.extraGetProps);
      config.getProps.push(...config.extraGetProps);
      delete config.extraGetProps;
    }
    if (config.extraChildLinks) {
      config.extraChildLinks = toArray(config.extraChildLinks);
      config.childLinks.push(...config.extraChildLinks);
      delete config.extraChildLinks;
    }
    if (config.extraChildElements) {
      config.extraChildElements = toArray(config.extraChildElements);
      config.childElements.push(...config.extraChildElements);
      delete config.extraChildElements;
    }
    return { config, lastQueue };
  };

  _add(configs) {
    return configs.map((_c) => {
      const configChain = toArray(_c);
      let config = {
        getProps: [(props, { link }) => ({ ...props, ...link.props })], childLinks: [], childElements: [],
      };
      let lastQueue = [];
      ({ config, lastQueue } = configChain.reduce(this.evaluateConfig, { config, lastQueue }));
      while (lastQueue.length > 0) {
        ({ config, lastQueue } = lastQueue.reduce(this.evaluateConfig, { config, lastQueue: [] }));
      }
      config.name = config.name || this.getUniqueName();
      this.fieldMap[config.name] = new this.FieldLink(this, config);
      const fieldLink = this.fieldMap[config.name];
      if (config.childLinks) {
        fieldLink.addChildLink(...this._add(config.childLinks));
      }
      if (config.childElements) {
        fieldLink.addChildElement(...this._add(config.childElements));
      }
      return fieldLink;
    });
  }

  add(...configs) {
    const result = this._add(configs);
    this.fieldLinks.push(...result);
    return result;
  }

  setDefaultValues(defaultValues) {
    Object.keys(defaultValues).forEach((key) => {
      const field = this.getField(key);
      if (field) {
        field.defaultValue = defaultValues[key];
      }
    });
  }

  getField = fieldName => this.fieldMap[fieldName];

  getFields = () => this.fieldMap;

  getValue = fieldName => this.fieldMap[fieldName].getValue();

  getValues = () => {
    const values = {};
    Object.keys(this.fieldMap).forEach((fieldName) => {
      values[fieldName] = this.getValue(fieldName);
    });
    return values;
  }

  getOutput = fieldName => this.fieldMap[fieldName].getOutput()

  getOutputs = () => {
    const values = {};
    Object.keys(this.fieldMap).forEach((fieldName) => {
      const field = this.fieldMap[fieldName];
      const value = field.getOutput();
      if (!field.ignoredFromOutputs && !(this.ignoredUndefinedFromOutputs && value === undefined)) {
        values[fieldName] = value;
      }
    });
    return values;
  }

  getFieldsFromState = targetState => (targetState || this.component.state)[this.fieldStateName];

  getValueFromState = (fieldName, targetState) => this.getFieldsFromState(targetState)[fieldName];

  getErrorsFromState = targetState => (targetState || this.component.state)[this.fieldErrorStateName];

  getErrorFromState = (fieldName, targetState) => this.getErrorsFromState(targetState)[fieldName];

  getCustomStatesFromState = targetState => (targetState || this.component.state)[this.fieldCustomStateName];

  getCustomStateFromState = (fieldName, targetState) => this.getCustomStatesFromState(targetState)[fieldName];

  getMergedCustomState = (newCustomStates, targetState) => ({
    [this.fieldCustomStateName]: {
      ...this.getCustomStatesFromState(targetState),
      ...newCustomStates,
    },
  });

  _getUpdatedStateForResetError = (fieldName, targetState) => ({
    [this.fieldErrorStateName]: {
      ...this.getErrorsFromState(targetState),
      [fieldName]: undefined,
    },
  });

  _getUpdatedState = (fieldName, value, targetState) => ({
    [this.fieldStateName]: {
      ...this.getFieldsFromState(targetState),
      [fieldName]: value,
    },
    ...this._getUpdatedStateForResetError(fieldName, targetState),
  });

  mergeInitState(state = {}) {
    const newState = {
      ...state,
      [this.fieldStateName]: { ...state[this.fieldStateName] },
      [this.fieldErrorStateName]: { ...state[this.fieldErrorStateName] },
      ...(this.fieldCustomStateName ? { [this.fieldCustomStateName]: { ...state[this.fieldCustomStateName] } } : {}),
    };
    Object.keys(this.fieldMap).forEach((fieldName) => {
      const field = this.fieldMap[fieldName];
      if (!field.handledByProps) {
        newState[this.fieldStateName][fieldName] = this.fieldMap[fieldName].defaultValue;
      }
      newState[this.fieldErrorStateName][fieldName] = undefined;
    });
    return newState;
  }

  validate(keepErrors = true) {
    let passed = true;
    const newErrorState = {};
    Object.keys(this.fieldMap).forEach((fieldName) => {
      const field = this.fieldMap[fieldName];
      if (field._validate) {
        let error;
        try {
          const result = field.validate();
          if (result instanceof Error) {
            error = result;
          }
        } catch (e) { error = e; }
        if (error) {
          newErrorState[fieldName] = error;
          field.onValidateError(newErrorState[fieldName], { link: field });
          passed = false;
        }
      }
    });

    if (!passed && keepErrors) {
      this.component.setState({
        [this.fieldErrorStateName]: {
          ...this.getErrorsFromState(),
          ...newErrorState,
        },
      });
    }
    return passed;
  }

  getErrorStatus = fieldName => ({ validateError: this.getErrorFromState(fieldName) });

  // render helpers
  renderProps = (fieldName, options = {}, ignoreKey) => {
    const field = this.fieldMap[fieldName];
    const props = {
      ...options.props,
    };
    if (!ignoreKey) {
      props.key = field.key;
    }
    const { validateError } = this.getErrorStatus(fieldName);

    const myProps = field.getProps(props, {
      value: field.getViewValue(),
      link: field,
      handleChange: field.handleChange,
      validateError,
    }, options);
    const { childLinks } = field;
    return childLinks.reduce((props, childLink) => ({
      ...props,
      ...this.renderProps(childLink.name, options, true),
    }), myProps);
  };

  renderComponent = (fieldName, options = {}) => {
    const field = this.fieldMap[fieldName];
    const Component = field.getInputComponent({});
    if (Component == null) {
      throw new Error(`Wrong Component Class (${fieldName})`);
    }

    if (!field.getVisibility({ link: field })) {
      return undefined;
    }

    const extraChildren = field.childElements.map(child => this.renderComponent(child.name, options));
    const props = {
      ...this.renderProps(fieldName, options),
      ...options.extraProps,
    };
    props.children = field.mergeChildren(toArray(props.children), toArray(extraChildren), { link: field });
    if (props.children.length === 0) {
      props.children = undefined;
    } else if (props.children.length === 1) { ([props.children] = props.children); }
    return (<Component {...props} />);
  };
}
