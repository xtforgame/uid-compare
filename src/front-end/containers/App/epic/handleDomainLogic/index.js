import modelMap from '~/containers/App/modelMap';

const { types } = modelMap;

const {
  selectOrganizationPath,
} = modelMap.actions;

const autoSelectDefaultOrganization = (action$, store) => action$.ofType(types.getOrganizations)
    .switchMap(startAction => action$.ofType(types.respondGetOrganizations)
        .take(1) // don't listen forever! IMPORTANT!
        .switchMap(action => action.data.filter(org => org.name === 'default')
          .map(org => selectOrganizationPath(org.id))));

export default [
  autoSelectDefaultOrganization,
];
