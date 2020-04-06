import Sequelize from 'sequelize';

export const patchMemo = async (resourceManager, memoId, data = {}) => {
  const Memo = resourceManager.getSqlzModel('memo');
  await Memo.update({
    data: Sequelize.literal(`data || '${JSON.stringify(data)}'::jsonb`),
  }, {
    where: {
      id: memoId,
    },
  });
  return Memo.findOne({
    where: {
      id: memoId,
    },
  });
};

export const memo = 1;
