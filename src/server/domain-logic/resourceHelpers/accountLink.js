import { getAssociationIncludes } from './common';

export const addInitDataToAccountLink = alParams => ({
  ...alParams,
  data: {
    confirmed: false,
    ...alParams.data,
  },
});

export const createAccountLink = async (resourceManager, paramsForCreate, userId) => {
  const AccountLink = resourceManager.getSqlzModel('accountLink');
  const transaction = resourceManager.db.transaction();
  try {
    const accountLink = await AccountLink.create(addInitDataToAccountLink({
      ...paramsForCreate,
      user_id: userId,
    }, {
      transaction,
    }));
    await transaction.commit();
    return accountLink;
  } catch (error) {
    transaction.rollback();
    return Promise.reject(error);
  }
};

export const updateAccessLink = async (
  resourceManager,
  provider_id,
  provider_user_id,
  provider_user_access_info,
) => {
  const AccountLink = resourceManager.getSqlzModel('accountLink');
  await AccountLink.update({
    provider_user_access_info,
  }, {
    where: {
      provider_id,
      provider_user_id,
    },
  });
  return true;
};

export const findAccountLink = async (resourceManager, provider_id, provider_user_id, includes = []) => {
  const AccountLink = resourceManager.getSqlzModel('accountLink');

  const include = getAssociationIncludes(resourceManager, 'accountLink', includes);
  return AccountLink.findOne({
    where: {
      provider_id,
      provider_user_id,
    },
    include,
  });
};
