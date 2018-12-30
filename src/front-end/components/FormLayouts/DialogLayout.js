import React from 'react';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import translateMessages from '~/utils/translateMessages';
import {
  FormSpace,
  FormContent,
} from '~/components/FormInputs';
import LayoutBase from '~/components/FormLayouts/LayoutBase';

class DialogLayout extends LayoutBase {
  render() {
    const {
      intl,
      space: defaultSpace = <FormSpace variant="content1" />,
      topSpace = <FormSpace variant="top" />,
      Content = FormContent,
      i18nMessages,
      i18nTranslate,
      extraContents,
      children,
    } = this.props;
    const translate = i18nTranslate
      || (i18nMessages ? translateMessages.bind(null, intl, i18nMessages) : undefined);

    return (
      <React.Fragment>
        {topSpace}
        <Content>
          {
            this.il.fieldLinks.map((filedLink) => {
              const space = 'space' in filedLink.options ? filedLink.options.space : defaultSpace;
              return (
                <React.Fragment key={filedLink.name}>
                  {this.il.renderComponent(filedLink.name, { translate })}
                  {space}
                </React.Fragment>
              );
            })
          }
          {extraContents}
        </Content>
        {children}
      </React.Fragment>
    );
  }
}

export default compose(
  injectIntl,
)(DialogLayout);
