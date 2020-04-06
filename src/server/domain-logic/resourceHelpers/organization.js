import Sequelize from 'sequelize';
import { getAssociationIncludes } from './common';
import { createNewUser } from './user';

export const findOrganization = async (resourceManager, userId, organizationId, includes = []) => {
  const UserOrganization = resourceManager.getSqlzAssociationModel('userOrganization');
  const Organization = resourceManager.getSqlzModel('organization');

  const userOrganization = await UserOrganization.findOne({
    where: {
      user_id: userId,
      organization_id: organizationId,
    },
  });
  if (!userOrganization) {
    return null;
  }
  const include = getAssociationIncludes(resourceManager, 'organization', includes);
  return Organization.findOne({
    where: {
      id: organizationId,
    },
    include,
  });
};

export const findOrganizationMembers = async (resourceManager, userId, organizationId) => {
  const organization = await findOrganization(resourceManager, userId, organizationId, [
    {
      as: 'users',
      order: [
        ['created_at', 'ASC'],
      ],
    },
  ]);
  if (!organization) {
    return null;
  }
  return organization.users;
};

export const patchOrganization = async (resourceManager, organizationId, data = {}) => {
  const Organization = resourceManager.getSqlzModel('organization');
  await Organization.update({
    data: Sequelize.literal(`data || '${JSON.stringify(data)}'::jsonb`),
  }, {
    where: {
      id: organizationId,
    },
  });
  return Organization.findOne({
    where: {
      id: organizationId,
    },
  });
};

export const addOrganizationMember = async (resourceManager, ownerId, organizationId, targetData) => {
  // const User = resourceManager.getSqlzModel('user');
  const UserOrganization = resourceManager.getSqlzAssociationModel('userOrganization');
  // const Organization = resourceManager.getSqlzModel('organization');

  const owner = await UserOrganization.findOne({
    where: {
      role: 'owner',
      user_id: ownerId,
      organization_id: organizationId,
    },
  });
  if (!owner) {
    return Promise.resolve(null);
  }
  const transaction = await resourceManager.db.transaction();
  const {
    id,
    name,
    disabled,
    role = 'user',
  } = targetData;
  try {
    const u = await UserOrganization.create({
      user_id: id,
      organization_id: organizationId,
      role,
      labels: { disabled, identifier: name },
    }, {
      transaction,
    });
    await transaction.commit();
    return u;
  } catch (error) {
    await transaction.rollback();
    return Promise.reject(error);
  }
};

export const removeOrganizationMember = async (resourceManager, ownerId, organizationId, memberId) => {
  // const User = resourceManager.getSqlzModel('user');
  const UserOrganization = resourceManager.getSqlzAssociationModel('userOrganization');
  // const Organization = resourceManager.getSqlzModel('organization');

  const owner = await UserOrganization.findOne({
    where: {
      role: 'owner',
      user_id: ownerId,
      organization_id: organizationId,
    },
  });
  if (!owner) {
    return Promise.resolve(null);
  }
  const transaction = await resourceManager.db.transaction();
  try {
    const u = UserOrganization.destroy({
      where: {
        user_id: memberId,
        organization_id: organizationId,
      },
      transaction,
    });
    await transaction.commit();
    return u;
  } catch (error) {
    await transaction.rollback();
    return Promise.reject(error);
  }
};

export const createOrganizationMember = async (resourceManager, ownerId, organizationId, targetData) => {
  // const User = resourceManager.getSqlzModel('user');
  const UserOrganization = resourceManager.getSqlzAssociationModel('userOrganization');
  // const Organization = resourceManager.getSqlzModel('organization');

  const owner = await UserOrganization.findOne({
    where: {
      role: 'owner',
      user_id: ownerId,
      organization_id: organizationId,
    },
  });
  if (!owner) {
    return Promise.resolve(null);
  }
  const transaction = await resourceManager.db.transaction();
  const {
    username,
    password,
    name,
    privilege,
    disabled,
    role = 'member',
  } = targetData;
  try {
    const r = await createNewUser(resourceManager, {
      username,
      password,
      name,
      privilege,
    }, {
      org_mgr_id: organizationId,
    }, transaction);
    await UserOrganization.create({
      user_id: r.id,
      organization_id: organizationId,
      labels: { disabled, identifier: name },
      role,
    }, {
      transaction,
    });
    await transaction.commit();
    return r;
  } catch (error) {
    await transaction.rollback();
    return Promise.reject(error);
  }
};

export const patchOrganizationMember = async (resourceManager, ownerId, organizationId, targetId, targetData) => {
  // const User = resourceManager.getSqlzModel('user');
  const UserOrganization = resourceManager.getSqlzAssociationModel('userOrganization');
  // const Organization = resourceManager.getSqlzModel('organization');

  const owner = await UserOrganization.findOne({
    where: {
      role: 'owner',
      user_id: ownerId,
      organization_id: organizationId,
    },
  });
  if (!owner) {
    return null;
  }
  const labels = { identifier: targetData.identifier };
  if (targetData.disabled != null) {
    labels.disabled = targetData.disabled;
  }
  return UserOrganization.update({
    labels: Sequelize.literal(`labels || '${JSON.stringify(labels)}'::jsonb`),
  }, {
    where: {
      user_id: targetId,
      organization_id: organizationId,
    },
  });
};
