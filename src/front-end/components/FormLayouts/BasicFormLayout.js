import React from 'react';
import useLayoutFeaturesEx from '~/hooks/useLayoutFeaturesEx';

const BasicFormLayout = (props) => {
  const {
    extraContents,
    children,
  } = props;

  const {
    il, resetIl, classesByNs, tData: { t/* , i18n, ready */ }, host,
    Content, space, topSpace,
  } = useLayoutFeaturesEx(props);

  il.updateHost(host);

  return (
    <React.Fragment>
      {topSpace}
      <Content>
        {
          il.fieldLinks.map((filedLink) => {
            const defaultSpace = 'space' in filedLink.options ? filedLink.options.space : space;
            return (
              <React.Fragment key={filedLink.name}>
                {il.renderComponent(filedLink.name, { translate: t })}
                {defaultSpace}
              </React.Fragment>
            );
          })
        }
        {extraContents}
      </Content>
      {children}
    </React.Fragment>
  );
};
BasicFormLayout.displayName = 'BasicFormLayout';

export default BasicFormLayout;
