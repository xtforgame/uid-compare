import React from 'react';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import translateMessages from '~/utils/translateMessages';
import {
  FormSpace,
  FormContent,
} from '~/components/FormInputs';
import EditableLayoutBase from '~/components/FormLayouts/EditableLayoutBase';

import createFormPaperStyle from '~/styles/FormPaper';

const styles = theme => ({
  ...createFormPaperStyle(theme),
});

class EditableLayout extends EditableLayoutBase {
  static getDerivedStateFromProps(props, prevState) {
    if (props.editing !== undefined && props.editing !== prevState.editing) {
      const nextState = {
        ...prevState,
        editing: props.editing,
      };
      return prevState.resetInputLinker(props, nextState);
    }
    return null;
  }

  render() {
    const {
      intl,
      classes,
      i18nMessages,
      i18nTranslate,
      submitButtonText,
      children,
    } = this.props;
    const translate = i18nTranslate
      || (i18nMessages ? translateMessages.bind(null, intl, i18nMessages) : undefined);

    return (
      <div>
        <FormSpace variant="top" />
        <FormContent>
          {
            this.il.fieldLinks.map((filedLink) => {
              const space = 'space' in filedLink.options ? filedLink.options.space : <FormSpace variant="content1" />;
              return (
                <React.Fragment key={filedLink.name}>
                  {this.il.renderComponent(filedLink.name, { translate })}
                  {space}
                </React.Fragment>
              );
            })
          }
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.loginBtn}
            onClick={this.handleSubmit}
          >
            {submitButtonText}
          </Button>
          <FormSpace variant="content1" />
        </FormContent>
        {children}
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(styles),
)(EditableLayout);
