import Sequelize from 'sequelize';
import { getAssociationIncludes } from './common';
import { createNewUser } from './user';

export const findProject = async (resourceManager, userId, projectId, includes = []) => {
  const UserProject = resourceManager.getSqlzAssociationModel('userProject');
  const Project = resourceManager.getSqlzModel('project');

  const userProject = await UserProject.findOne({
    where: {
      user_id: userId,
      project_id: projectId,
    },
  });
  if (!userProject) {
    return null;
  }
  const include = getAssociationIncludes(resourceManager, 'project', includes);
  return Project.findOne({
    where: {
      id: projectId,
    },
    include,
  });
};

export const findAllProject = async (resourceManager, where, includes = []) => {
  const Project = resourceManager.getSqlzModel('project');

  const include = getAssociationIncludes(resourceManager, 'project', includes);
  return Project.findAll({
    where,
    include,
  });
};

export const findProjectMembers = async (resourceManager, userId, projectId) => {
  const project = await findProject(resourceManager, userId, projectId, [
    {
      as: 'users',
      order: [
        ['created_at', 'ASC'],
      ],
    },
    {
      as: 'users.organizations',
      attributes: ['id', 'name'],
    },
  ]);
  if (!project) {
    return null;
  }
  return project.users;
};

export const patchProject = async (resourceManager, projectId, data = {}) => {
  const Project = resourceManager.getSqlzModel('project');
  await Project.update({
    data: Sequelize.literal(`data || '${JSON.stringify(data)}'::jsonb`),
  }, {
    where: {
      id: projectId,
    },
  });
  return Project.findOne({
    where: {
      id: projectId,
    },
  });
};

export const addProjectMember = async (resourceManager, ownerId, projectId, targetData) => {
  // const User = resourceManager.getSqlzModel('user');
  const UserProject = resourceManager.getSqlzAssociationModel('userProject');
  // const Project = resourceManager.getSqlzModel('project');

  const owner = await UserProject.findOne({
    where: {
      role: 'owner',
      user_id: ownerId,
      project_id: projectId,
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
    const u = await UserProject.create({
      user_id: id,
      project_id: projectId,
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

export const removeProjectMember = async (resourceManager, ownerId, projectId, memberId) => {
  // const User = resourceManager.getSqlzModel('user');
  const UserProject = resourceManager.getSqlzAssociationModel('userProject');
  // const Project = resourceManager.getSqlzModel('project');

  const owner = await UserProject.findOne({
    where: {
      role: 'owner',
      user_id: ownerId,
      project_id: projectId,
    },
  });
  if (!owner) {
    return Promise.resolve(null);
  }
  const u = UserProject.destroy({
    where: {
      user_id: memberId,
      project_id: projectId,
    },
  });
  return u;
};

export const createProjectMember = async (resourceManager, ownerId, projectId, targetData) => {
  // const User = resourceManager.getSqlzModel('user');
  const UserProject = resourceManager.getSqlzAssociationModel('userProject');
  // const Project = resourceManager.getSqlzModel('project');

  const owner = await UserProject.findOne({
    where: {
      role: 'owner',
      user_id: ownerId,
      project_id: projectId,
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
  } = targetData;
  try {
    const r = await createNewUser(resourceManager, {
      username,
      password,
      name,
      privilege,
    }, {
      org_mgr_id: projectId,
    }, transaction);
    await UserProject.create({
      user_id: r.id,
      project_id: projectId,
      labels: { disabled, identifier: name },
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

export const patchProjectMember = async (resourceManager, ownerId, projectId, targetId, targetData) => {
  // const User = resourceManager.getSqlzModel('user');
  const UserProject = resourceManager.getSqlzAssociationModel('userProject');
  // const Project = resourceManager.getSqlzModel('project');

  const owner = await UserProject.findOne({
    where: {
      role: 'owner',
      user_id: ownerId,
      project_id: projectId,
    },
  });
  if (!owner) {
    return null;
  }
  const labels = { identifier: targetData.identifier };
  const extras = targetData.role ? { role: targetData.role } : {};
  if (targetData.disabled != null) {
    labels.disabled = targetData.disabled;
  }
  return UserProject.update({
    ...extras,
    labels: Sequelize.literal(`labels || '${JSON.stringify(labels)}'::jsonb`),
  }, {
    where: {
      user_id: targetId,
      project_id: projectId,
    },
  });
};
