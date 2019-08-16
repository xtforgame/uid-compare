import { createSelector } from 'reselect';
import { defaultUiTheme } from '~/styles/getPageContext';

import modelMap from './modelMap';

const {
  sessionSelector,
  makeSessionHierarchySelector,
  makeSessionSelectionSelector,
  makeSelectedSessionNodeSelector,
  makeSelectedSessionCollectionSelector,
  makeSelectedSessionSelector,

  userSelector,
  makeUserHierarchySelector,
  makeUserSelectionSelector,
  makeSelectedUserNodeSelector,
  makeSelectedUserCollectionSelector,
  makeSelectedUserSelector,

  makeOrganizationSelectionSelector,
  makeEntryInstHierarchySelector,
  makeCategoryHierarchySelector,
  makeCategoryLayoutHierarchySelector,
  makeOrgRecordHierarchySelector,
} = modelMap.selectors;

const makeUserSessionSelector = () => createSelector(
  makeSessionHierarchySelector(),
  hierarchy => hierarchy && hierarchy.byId && hierarchy.byId.me
);

const makeMyUserSelector = () => createSelector(
  makeUserSessionSelector(),
  makeUserHierarchySelector(),
  (mySession, userHierarchy) => {
    if (!mySession
      || !userHierarchy
      || (mySession.user_id === undefined)
      || !userHierarchy.byId
    ) {
      return undefined;
    }
    return userHierarchy.byId[mySession.user_id];
  }
);

const persistenceSelector = state => state.global.persistence;
const makeRememberUserSelector = () => createSelector(
  persistenceSelector,
  persistence => persistence.rememberUser
);

const makeUiThemeSelector = () => createSelector(
  persistenceSelector,
  persistence => persistence.uiTheme || defaultUiTheme,
);


const appTempStateSelector = state => state.global.appTempState;

const makeSelectedNodeSelector = hierarchySelector => createSelector(
  makeOrganizationSelectionSelector(),
  hierarchySelector,
  (selectedOrgPath, hierarchyRoot) => {
    if (selectedOrgPath && selectedOrgPath.entry && selectedOrgPath.entry.id
      && hierarchyRoot
      && hierarchyRoot[selectedOrgPath.entry.id]) {
      return hierarchyRoot[selectedOrgPath.entry.id];
    }
    return undefined;
  },
);

const makeSelectedEntryInstNodeSelector = () => makeSelectedNodeSelector(makeEntryInstHierarchySelector());
const makeSelectedCategoryNodeSelector = () => makeSelectedNodeSelector(makeCategoryHierarchySelector());
const makeSelectedCategoryLayoutNodeSelector = () => makeSelectedNodeSelector(makeCategoryLayoutHierarchySelector());
const makeSelectedOrgRecordNodeSelector = () => makeSelectedNodeSelector(makeOrgRecordHierarchySelector());

const makeMyCurrentEntryInstSelector = () => createSelector(
  makeMyUserSelector(),
  makeSelectedEntryInstNodeSelector(),
  (myUser, entryInstNode) => {
    if (!myUser || !entryInstNode || !entryInstNode.byId) {
      return undefined;
    }
    const myEntryInst = myUser.asEntryInsts.filter(e => e.organization_id == 1)[0]; // eslint-disable-line eqeqeq
    if (!myEntryInst) {
      return undefined;
    }
    return entryInstNode.byId[myEntryInst.id];
  }
);

export {
  sessionSelector,
  makeSessionHierarchySelector,
  makeSessionSelectionSelector,
  makeSelectedSessionNodeSelector,
  makeSelectedSessionCollectionSelector,
  makeSelectedSessionSelector,

  userSelector,
  makeUserHierarchySelector,
  makeUserSelectionSelector,
  makeSelectedUserNodeSelector,
  makeSelectedUserCollectionSelector,
  makeSelectedUserSelector,

  makeUserSessionSelector,
  makeMyUserSelector,
  persistenceSelector,
  makeRememberUserSelector,
  makeUiThemeSelector,

  appTempStateSelector,

  makeSelectedNodeSelector,
  makeSelectedEntryInstNodeSelector,
  makeSelectedCategoryNodeSelector,
  makeSelectedCategoryLayoutNodeSelector,
  makeSelectedOrgRecordNodeSelector,

  makeMyCurrentEntryInstSelector,
};
