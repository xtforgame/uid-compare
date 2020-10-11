import React from 'react';

import {
  urlPrefix,
} from 'config';

import redirect, { getLinkUrl } from '../redirect';

export default props => (
  <React.Fragment>
    Home
    <br />
    <a href={getLinkUrl('about')}>
      About
    </a>
    <br />
    <a href={getLinkUrl('blogc1')}>
      Articles C1
    </a>
    <br />
  </React.Fragment>
);
