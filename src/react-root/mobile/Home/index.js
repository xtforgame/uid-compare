import React from 'react';

import {
  urlPrefix,
} from 'config';

import { Link } from '../redirect';

export default props => (
  <React.Fragment>
    Home
    <br />
    <Link path={'about'}>
      About
    </Link>
    <br />
    <Link path={'blogc1'}>
      Articles C1
    </Link>
    <br />
  </React.Fragment>
);
