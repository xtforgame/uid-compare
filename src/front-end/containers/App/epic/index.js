import modelMap from '../modelMap';
import handleSessionEpics from './handleSessionEpics';
import handleUserSettingsEpics from './handleUserSettingsEpics';
import handleDomainLogic from './handleDomainLogic';

const {
  postSessionsEpic,
  getSessionsEpic,
  getUserEpic,
  postUsersEpic,
  patchUserEpic,
  postRecoveryTokensEpic,

  getUserSettingsEpic,
  patchUserSettingEpic,

  postChallengeRecoveryTokensEpic,
  postResetPasswordRequestsEpic,

  getMemosEpic,
  postMemosEpic,
  patchMemoEpic,

  getOrganizationsEpic,
  postOrganizationsEpic,
  patchOrganizationEpic,

  getProjectsEpic,
  getProjectEpic,
  postProjectsEpic,
  patchProjectEpic,
} = modelMap.epics;


export default [
  ...handleSessionEpics,
  ...handleUserSettingsEpics,
  ...handleDomainLogic,

  postSessionsEpic,
  getSessionsEpic,
  getUserEpic,
  postUsersEpic,
  patchUserEpic,

  getUserSettingsEpic,
  patchUserSettingEpic,

  postRecoveryTokensEpic,

  postChallengeRecoveryTokensEpic,
  postResetPasswordRequestsEpic,

  getMemosEpic,
  postMemosEpic,
  patchMemoEpic,

  getOrganizationsEpic,
  postOrganizationsEpic,
  patchOrganizationEpic,

  getProjectsEpic,
  getProjectEpic,
  postProjectsEpic,
  patchProjectEpic,
];
