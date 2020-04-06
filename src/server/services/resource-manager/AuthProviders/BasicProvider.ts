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
import { addInitDataToAccountLink } from '~/domain-logic';

export default class BasicProvider extends BaseProvider {
  async getAccountLinkParamsForCreate(alParams : AccountLinkParams) : Promise<AccountLinkParams> {
    const params = await super.getAccountLinkParamsForCreate(alParams);
    return addInitDataToAccountLink(params);
  }
}
