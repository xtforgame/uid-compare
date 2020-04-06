/* eslint-disable no-underscore-dangle */
// import Sequelize from 'sequelize';
import { RestfulError } from 'az-restful-helpers';
import { AccountLinkStore } from 'az-authn-kit-v2';

import {
  createAccountLink,
  findAccountLink,
  findUserWithAccountLink,
} from '~/domain-logic';

export default class SequelizeStore {
  constructor(options) {
    this.options = options;
    this.publicColumnsMap = {
      user: ['id', 'name', 'privilege', 'labels'],
      accountLink: ['id', 'provider_id', 'provider_user_id'],
    };
  }

  setResourceManager(resourceManager) {
    this.resourceManager = resourceManager;
  }

  _filterColumns(modelName, originalResult, passAnyway = []) {
    if (!originalResult || !originalResult.dataValues) {
      return null;
    }
    const dataFromDb = originalResult.dataValues;

    const data = {};
    this.publicColumnsMap[modelName].concat(passAnyway).forEach((columnName) => {
      data[columnName] = dataFromDb[columnName];
    });
    return data;
  }

  createAccountLink = async (paramsForCreate, userId) => {
    try {
      const accountLink = await createAccountLink(this.resourceManager, paramsForCreate, userId);
      return this._filterColumns('accountLink', accountLink);
    } catch (error) {
      if (error && error.name === 'SequelizeUniqueConstraintError') {
        return RestfulError.rejectWith(409, 'This account link has been taken', error);
      }
      return RestfulError.rejectWith(500, 'Internal Server Error', error);
    }
  }

  findUserWithAccountLink = async (userId) => {
    const originalResult = await findUserWithAccountLink(this.resourceManager, userId);

    const user = this._filterColumns('user', originalResult);
    if (!user) {
      return null;
    }

    const userFromDb = originalResult.dataValues;
    user.accountLinks = userFromDb.accountLinks.map(accountLinkFromDb => this._filterColumns('accountLink', accountLinkFromDb));

    return user;
  }

  findAccountLink = async (provider_id, provider_user_id) => {
    const originalResult = await findAccountLink(this.resourceManager, provider_id, provider_user_id, ['user']);
    const accountLink = this._filterColumns('accountLink', originalResult, ['provider_user_access_info']);
    if (!accountLink) {
      return null;
    }

    const accountLinkFromDb = originalResult.dataValues;
    accountLink.user = this._filterColumns('user', accountLinkFromDb.user);
    return accountLink;
  }

  deleteAllAccountLinkFromUser = async (userId) => {
    const AccountLink = this.resourceManager.getSqlzModel('accountLink');
    const user = await this.findUserWithAccountLink(userId);

    if (!user) {
      return RestfulError.rejectWith(404, 'UserNotFound');
    }

    const affectedRows = await AccountLink.destroy({
      where: {
        user_id: user.id,
      },
    });
    return { affectedRows };
  }

  deleteAccountLinkFromUser = async (userId, authType, isAdmin) => {
    const AccountLink = this.resourceManager.getSqlzModel('accountLink');
    const user = await this.findUserWithAccountLink(userId);

    if (!user) {
      return RestfulError.rejectWith(404, 'UserNotFound');
    }
    if (user.accountLinks.length === 1
     && user.accountLinks[0].provider_id === authType
     && !isAdmin) {
      return RestfulError.rejectWith(403, 'You cannot remove the only account link without the admin privilege.');
    }

    /* only unlink
    return user.removeAccountLinks(user.accountLinks)
    .then((affectedRows) => {
      console.log('DELETE ROWS :', affectedRows);
      return affectedRows;
    })
    .then(() => {
      return {success: true};
    });
    */
    const affectedRows = await AccountLink.destroy({
      where: {
        user_id: user.id,
        provider_id: authType,
      },
    });
    return { affectedRows };
  }

  // =====================================================

  getAccountLinkStore() {
    return new AccountLinkStore(this.findAccountLink, this.createAccountLink);
  }
}
