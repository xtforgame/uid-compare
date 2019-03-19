/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { compose } from 'recompose';
import { withTranslation, Trans } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import translateMessages from '~/utils/translateMessages';
import {
  InternalLink as Link,
} from '~/components/FormInputs';
import FormBaseType001 from '~/containers/LoginForms/FormBaseType001';
import createFormPaperStyle from '~/styles/FormPaper';

const styles = theme => ({
  ...createFormPaperStyle(theme),
});

class RegistrationForm extends React.PureComponent {
  render() {
    const {
      t,
      classes,
      fields,
      comfirmUserAgreement,
    } = this.props;
    const translated = translateMessages(t, [
      'terms',
      'createAccountV',
      'privacyPolicy',
    ]);

    const userAgreementLabel = (
      <Typography
        variant="body1"
        className={classes.textContainer}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
        onMouseDown={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
      >
        <Trans
          i18nKey="react-common:userAgreement"
          values={{
            createAccountV: translated.createAccountV,
            terms: '',
            privacyPolicy: '',
          }}
          components={[
            <Link key="terms" text={translated.terms} />,
            <Link key="privacyPolicy" text={translated.privacyPolicy} />,
          ]}
        />
      </Typography>
    );

    return (
      <FormBaseType001
        {...this.props}
        comfirmUserAgreement={comfirmUserAgreement}
        userAgreementLabel={userAgreementLabel}
        fields={fields}
      />
    );
  }
}

export default compose(
  withTranslation(['app-common', 'react-common']),
  withStyles(styles),
)(RegistrationForm);
