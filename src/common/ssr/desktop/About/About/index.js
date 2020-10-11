import React from 'react';

import {
  urlPrefix,
} from 'config';

import { getLinkUrl } from '../../redirect';

export default props => (
  <React.Fragment>
    About
    <br />
    <a href={getLinkUrl('')}>
      Home
    </a>
  </React.Fragment>
);
