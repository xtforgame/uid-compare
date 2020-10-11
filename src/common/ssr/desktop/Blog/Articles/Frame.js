import React from 'react';
import { getLinkUrl } from '../../redirect';

export default ({ children }) => (
  <React.Fragment>
    Articles
    <br />
    <a href={getLinkUrl('')}>
      Home
    </a>
    {children}
  </React.Fragment>
);
