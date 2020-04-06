import { RestfulError } from 'az-restful-helpers';
import {
  CheckParamsFunction,

  AuthParams,
  RequiredAuthParams,

  AccountLinkParams,

  ProviderId,
  ProviderUserId,
  AccountLink,
  AuthProvider,
  BasicProvider as BaseProvider,
} from 'az-authn-kit-v2';

const addInitDataToAccountLink = (alParams : AccountLinkParams) : AccountLinkParams => {
  return {
    ...alParams,
    data: {
      ...alParams.data,
      confirmed: false,
    },
  };
};

export default addInitDataToAccountLink;
