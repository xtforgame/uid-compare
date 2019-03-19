import React from 'react';
import { withTranslation } from 'react-i18next';
import {
  FormSpace,
  FormContent,
} from '~/components/FormInputs';
import LayoutBase from '~/components/FormLayouts/LayoutBase';

class DialogLayout extends LayoutBase {
  render() {
    const {
      space: defaultSpace = <FormSpace variant="content1" />,
      topSpace = <FormSpace variant="top" />,
      Content = FormContent,
      extraContents,
      children,
      t: translate,
    } = this.props;

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

export default withTranslation(['app-common'])(DialogLayout);
