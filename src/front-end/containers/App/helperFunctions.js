/* eslint-disable import/prefer-default-export */
import {
  capitalizeFirstLetter,
} from 'reduxtful/core/common-functions';
import {
  getStore,
} from '~/configureStore';
import modelMap from './modelMap';

const {
  makeOrganizationSelectionSelector,
} = modelMap.selectors;

const {
  waitableActions,
} = modelMap;

export const refreshSelectedOrganizationCollections = (resourceNames = []) => {
  const store = getStore();
  const selectedOrgPath = makeOrganizationSelectionSelector()(store.getState());

  const organizationId = selectedOrgPath && selectedOrgPath.entry && selectedOrgPath.entry.id;
  if (!organizationId) {
    return Promise.reject(new Error('Organization id not found'));
  }
  const promises = resourceNames.map((name) => {
    const action = waitableActions[`get${capitalizeFirstLetter(name)}`];
    return action && store.dispatch(action({ organizationId }));
  }).filter(p => p);
  return Promise.all(promises);
};
