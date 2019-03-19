import React from 'react';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
  render() {
    const {
      t: translate,
      classes,
      submitButtonText,
      children,
    } = this.props;

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
  withTranslation(['app-common']),
  withStyles(styles),
)(EditableLayout);
