/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import EditableLayoutBase from '~/components/FormLayouts/EditableLayoutBase';

import MuiCard from '@material-ui/core/Card';

const styles = theme => ({
});

class EditableCardLayout extends EditableLayoutBase {
  startEditing = () => {
    const { onStartEditing } = this.props;
    if (onStartEditing) {
      onStartEditing();
    }
  };

  cancelEditing = () => {
    const { onCancelEditing } = this.props;
    if (onCancelEditing) {
      onCancelEditing();
    }
  };

  render() {
    const {
      t: translate,
      Card = MuiCard,
      className,
      cardProps,
    } = this.props;

    const extraProps = {};
    if (className) {
      extraProps.className = className;
    }

    return (
      <Card {...extraProps} {...cardProps}>
        {this.il.fieldLinks.map(filedLink => this.il.renderComponent(filedLink.name, { translate }))}
      </Card>
    );
  }
}

export default compose(
  withTranslation(['app-common']),
  withStyles(styles),
)(EditableCardLayout);
