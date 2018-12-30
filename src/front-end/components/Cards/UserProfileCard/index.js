/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import translateMessages from '~/utils/translateMessages';
import EditableLayoutBase from '~/components/FormLayouts/EditableLayoutBase';

import Card from '@material-ui/core/Card';

const styles = theme => ({
  card: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 345,
    },
  },
});

class UserProfileCard extends EditableLayoutBase {
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
    const { classes } = this.props;
    const {
      intl,
      i18nMessages,
      i18nTranslate,
    } = this.props;
    const translate = i18nTranslate
      || (i18nMessages ? translateMessages.bind(null, intl, i18nMessages) : undefined);

    return (
      <Card className={classes.card}>
        {this.il.fieldLinks.map(filedLink => this.il.renderComponent(filedLink.name, { translate }))}
      </Card>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(styles),
)(UserProfileCard);
