// model for az RDBMS ORM
import Sequelize from 'sequelize';
import AmmOrm, { AmmSchemas } from 'az-model-manager/core';

const schema : () => AmmSchemas = () => ({
  models: {
    accountLink: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        provider_id: {
          type: Sequelize.STRING,
          // unique: true,
        },
        provider_user_id: {
          type: Sequelize.STRING,
          // unique: true,
        },
        provider_user_access_info: {
          type: Sequelize.JSONB,
          // unique: true,
        },
        data: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        user: {
          type: AmmOrm.columnTypes.BELONGS_TO('user', {
            foreignKey: 'user_id',
          }),
        },
        recoveryToken: {
          type: AmmOrm.columnTypes.HAS_ONE('recoveryToken', {
            foreignKey: 'account_link_id',
          }),
        },
      },
      options: {
        name: {
          singular: 'accountLink',
          plural: 'accountLinks',
        },
        // defaultScope: {
        //   attributes: accountLinkPublicColumns,
        // },
        indexes: [
          {
            name: 'provider_user_id_should_be_unique',
            unique: true,
            fields: ['user_id', 'provider_id', 'provider_user_id'],
            where: {
              deleted_at: null,
            },
          },
          {
            unique: true,
            fields: ['provider_id', 'provider_user_id'],
            where: {
              deleted_at: null,
            },
          },
        ],
      },
    },
    user: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          // unique: true,
          comment: 'Username',
        },
        type: {
          type: Sequelize.STRING,
          defaultValue: 'regular',
          comment: 'type of user. ex. regular, room, ... etc.',
        },
        privilege: Sequelize.STRING,
        labels: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        accountLinks: {
          type: AmmOrm.columnTypes.HAS_MANY('accountLink', {
            foreignKey: 'user_id',
          }),
        },
        // email: Sequelize.STRING(900),
        picture: Sequelize.TEXT,
        data: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        managedBy: {
          type: AmmOrm.columnTypes.BELONGS_TO('organization', {
            foreignKey: 'org_mgr_id',
          }),
        },
        userGroups: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('userGroup', {
            through: {
              unique: false,
              ammModelName: 'userUserGroup',
              ammThroughAs: 'relation',
            },
            foreignKey: 'user_id',
            otherKey: 'group_id',
          }),
        },
        groupInvitations: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('userGroup', {
            through: {
              unique: false,
              ammModelName: 'groupInvitation',
              ammThroughAs: 'state',
            },
            foreignKey: 'invitee_id',
            otherKey: 'group_id',
          }),
        },
        organizations: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('organization', {
            through: {
              unique: false,
              ammModelName: 'userOrganization',
              ammThroughAs: 'relation',
            },
            foreignKey: 'user_id',
            otherKey: 'organization_id',
          }),
        },
        organizationInvitations: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('organization', {
            through: {
              unique: false,
              ammModelName: 'organizationInvitation',
              ammThroughAs: 'state',
            },
            foreignKey: 'invitee_id',
            otherKey: 'organization_id',
          }),
        },
        projects: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('project', {
            through: {
              unique: false,
              ammModelName: 'userProject',
              ammThroughAs: 'relation',
            },
            foreignKey: 'user_id',
            otherKey: 'project_id',
          }),
        },
        projectInvitations: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('project', {
            through: {
              unique: false,
              ammModelName: 'projectInvitation',
              ammThroughAs: 'state',
            },
            foreignKey: 'invitee_id',
            otherKey: 'project_id',
          }),
        },
        userSettings: {
          type: AmmOrm.columnTypes.HAS_MANY('userSetting', {
            foreignKey: 'user_id',
          }),
        },
        memos: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('memo', {
            through: {
              unique: false,
              ammModelName: 'userMemo',
              ammThroughAs: 'relation',
            },
            foreignKey: 'user_id',
            otherKey: 'memo_id',
          }),
        },
      },
      options: {
        name: {
          singular: 'user',
          plural: 'users',
        },
        // defaultScope: {
        //   attributes: userPublicColumns,
        // },
        hooks: {
          // executed "before" `Model.sync(...)`
          beforeSync(options) {
            // console.log('beforeSync');
          },
          // executed "after" `Model.sync(...)`
          afterSync(options) {
            // this = Model
            // console.log('afterSync');
            return options.sequelize.query('SELECT start_value, last_value, is_called FROM tbl_user_id_seq', { type: Sequelize.QueryTypes.SELECT })
              .then(([result]) => {
                if (!result.is_called) {
                  return options.sequelize.query('ALTER SEQUENCE tbl_user_id_seq RESTART WITH 1000000001', { type: Sequelize.QueryTypes.SELECT })
                  .then((result2) => {});
                }
                return Promise.resolve();
              });
          },
        },
      },
    },
    userSetting: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: Sequelize.STRING(200),
          defaultValue: 'general',
        },
        data: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        user: {
          type: AmmOrm.columnTypes.BELONGS_TO('user', {
            foreignKey: 'user_id',
          }),
        },
      },
      options: {
        indexes: [
          {
            name: 'setting_type_should_be_unique_for_each_user',
            unique: true,
            fields: ['user_id', 'type'],
          },
        ],
      },
    },
    log: {
      columns: {
        type: Sequelize.STRING(900),
        data: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
      },
    },
    recoveryToken: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        type: Sequelize.STRING(200),
        key: Sequelize.STRING(900),
        token: Sequelize.STRING(900),
        accountLink: {
          type: AmmOrm.columnTypes.BELONGS_TO('accountLink', {
            foreignKey: 'account_link_id',
          }),
        },
      },
      options: {
        timestamps: true,
        paranoid: false,
        indexes: [
          {
            name: 'reset_password_key_should_be_unique',
            unique: true,
            fields: [/* 'type', */'key'],
          },
          {
            name: 'reset_password_token_should_be_unique',
            unique: true,
            fields: ['token'],
          },
          {
            name: 'only_one_reset_password_token_for_account_link',
            unique: true,
            fields: ['account_link_id'],
          },
        ],
      },
    },
    userGroup: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING(900),
        users: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'userUserGroup',
              ammThroughAs: 'relation',
            },
            foreignKey: 'group_id',
            otherKey: 'user_id',
          }),
        },
        inviters: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'groupInvitation',
              ammThroughAs: 'state',
            },
            foreignKey: 'group_id',
            otherKey: 'inviter_id',
          }),
        },
        invitees: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'groupInvitation',
              ammThroughAs: 'state',
            },
            foreignKey: 'group_id',
            otherKey: 'invitee_id',
          }),
        },
      },
    },
    organization: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING(900),
        users: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'userOrganization',
              ammThroughAs: 'relation',
            },
            foreignKey: 'organization_id',
            otherKey: 'user_id',
          }),
        },
        projects: {
          type: AmmOrm.columnTypes.HAS_MANY('project', {
            foreignKey: 'organization_id',
          }),
        },
        inviters: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'organizationInvitation',
              ammThroughAs: 'state',
            },
            foreignKey: 'organization_id',
            otherKey: 'inviter_id',
          }),
        },
        invitees: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'organizationInvitation',
              ammThroughAs: 'state',
            },
            foreignKey: 'organization_id',
            otherKey: 'invitee_id',
          }),
        },
      },
    },
    project: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        type: Sequelize.STRING(900),
        name: Sequelize.STRING(900),
        data: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        users: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'userProject',
              ammThroughAs: 'relation',
            },
            foreignKey: 'project_id',
            otherKey: 'user_id',
          }),
        },
        organization: {
          type: AmmOrm.columnTypes.BELONGS_TO('organization', {
            foreignKey: 'organization_id',
          }),
        },
        inviters: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'projectInvitation',
              ammThroughAs: 'state',
            },
            foreignKey: 'project_id',
            otherKey: 'inviter_id',
          }),
        },
        invitees: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'projectInvitation',
              ammThroughAs: 'state',
            },
            foreignKey: 'project_id',
            otherKey: 'invitee_id',
          }),
        },
      },
    },
    memo: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        data: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        users: {
          type: AmmOrm.columnTypes.BELONGS_TO_MANY('user', {
            through: {
              unique: false,
              ammModelName: 'userMemo',
              ammThroughAs: 'relation',
            },
            foreignKey: 'memo_id',
            otherKey: 'user_id',
          }),
        },
      },
    },
    contactUsMessage: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        message: Sequelize.STRING(900),
        data: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        author: {
          type: AmmOrm.columnTypes.BELONGS_TO('user', {
            foreignKey: 'author_id',
          }),
        },
        assignee: {
          type: AmmOrm.columnTypes.BELONGS_TO('user', {
            foreignKey: 'assignee_id',
          }),
        },
        state: {
          type: Sequelize.STRING(900),
          defaultValue: 'pending',
        },
      },
    },
  },
  associationModels: {
    userUserGroup: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        role: Sequelize.STRING,
      },
      options: {
        indexes: [
          {
            name: 'user_user_group_uniqueness',
            unique: true,
            fields: ['user_id', 'group_id'],
            where: {
              deleted_at: null,
            },
          },
        ],
      },
    },
    groupInvitation: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        state: Sequelize.INTEGER,
      },
      options: {
        indexes: [
          {
            name: 'group_only_invite_once',
            unique: true,
            fields: ['group_id', 'inviter_id', 'invitee_id'],
            where: {
              deleted_at: null,
            },
          },
        ],
      },
    },
    userOrganization: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        labels: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        data: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        role: Sequelize.STRING,
      },
      options: {
        indexes: [
          {
            name: 'user_organization_uniqueness',
            unique: true,
            fields: ['user_id', 'organization_id'],
            where: {
              deleted_at: null,
            },
          },
        ],
      },
    },
    organizationInvitation: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        state: Sequelize.INTEGER,
      },
      options: {
        indexes: [
          {
            name: 'organization_only_invite_once',
            unique: true,
            fields: ['organization_id', 'inviter_id', 'invitee_id'],
            where: {
              deleted_at: null,
            },
          },
        ],
      },
    },
    userProject: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        labels: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        data: {
          type: Sequelize.JSONB,
          defaultValue: {},
        },
        role: Sequelize.STRING,
      },
      options: {
        indexes: [
          {
            name: 'user_project_uniqueness',
            unique: true,
            fields: ['user_id', 'project_id'],
            where: {
              deleted_at: null,
            },
          },
        ],
      },
    },
    projectInvitation: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        state: Sequelize.INTEGER,
      },
      options: {
        indexes: [
          {
            name: 'project_only_invite_once',
            unique: true,
            fields: ['project_id', 'inviter_id', 'invitee_id'],
            where: {
              deleted_at: null,
            },
          },
        ],
      },
    },
    userMemo: {
      columns: {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        role: Sequelize.STRING,
      },
      options: {
        indexes: [
          {
            name: 'user_memo_uniqueness',
            unique: true,
            fields: ['user_id', 'memo_id'],
            where: {
              deleted_at: null,
            },
          },
        ],
      },
    },
  },
});

export default schema;
