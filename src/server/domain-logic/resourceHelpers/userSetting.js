import Sequelize from 'sequelize';

export const findUserSettings = (resourceManager, userId) => {
  const UserSetting = resourceManager.getSqlzModel('userSetting');

  return UserSetting.findAll({
    attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    where: {
      user_id: userId,
    },
  });
};

export const patchUserSetting = async (resourceManager, userId, userSettingType, data = {}) => {
  const UserSetting = resourceManager.getSqlzModel('userSetting');
  await UserSetting.update({
    data: Sequelize.literal(`data || '${JSON.stringify(data)}'::jsonb`),
  }, {
    where: {
      user_id: userId,
      type: userSettingType,
    },
  });
  return UserSetting.findOne({
    where: {
      user_id: userId,
      type: userSettingType,
    },
  });
};
