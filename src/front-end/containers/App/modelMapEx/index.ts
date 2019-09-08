import axios from 'axios';
import { createSelector } from 'reselect';
import { getHeaders } from '~/utils/HeaderManager';
import {
  INIT_FUNC,
  createFeatureGroup,
} from 'querchy';

import {
  ExtraSelectorCreatorCreatorX1,
  ExtraSelectorInfoForModelX1,
  QuerchyX1,
  AxiosRunnerX1,
  CacherX1,
} from './typesX1';

import CrudT1 from 'querchy/exports/features/CrudT1';
import UpdateCacheT1 from 'querchy/exports/features/UpdateCacheT1';
import CollectionT1 from 'querchy/exports/features/CollectionT1';

export const crudT1 = new CrudT1();
export const updateCacheT1 = new UpdateCacheT1();
export const collectionT1 = new CollectionT1();

export const crudUpdateCacheT1 = createFeatureGroup(
  crudT1,
  updateCacheT1,
);

export const crudUpdateCacheCollectionT1 = createFeatureGroup(
  crudUpdateCacheT1,
  collectionT1,
);
// // or use this way
// export const crudUpdateCacheCollectionT1 = createFeatureGroup(
//   crudT1,
//   updateCacheT1,
//   collectionT1,
// );

const rootSliceKey = 'cache';

const getSharedInfo = (url : string) => ({
  url,
  buildUrl: (modelBaseUrl, action) => {
    if (
      action.crudType === 'create'
      || action.crudType === 'getCollection'
    ) {
      return modelBaseUrl;
    }
    return `${modelBaseUrl}/${action.resourceId}`;
  },
  queryInfos: {},
  actionInfos: {},
  feature: crudUpdateCacheCollectionT1,
  featureDeps: {
    getId: (action) => {
      return (
        action.response
        && action.response.data
        && action.response.data.id
      );
    },
    parseResponse: (s, action) => {
      return {
        update: (
          (
            action.response
            && action.response.data
          ) || []
        ).reduce((m, item) => ({ ...m, [item.id]: item }), {}),
      };
    },
  },
});

const getExtraSelectorInfoX1 : () => {
  selectCollenctionItems: ExtraSelectorInfoForModelX1<any[]>,
} = () => ({
  selectCollenctionItems: {
    creatorCreator: (baseSelector, builtinSelectorCreators) => {
      return () => createSelector(
        builtinSelectorCreators.selectQueryMapValues(),
        builtinSelectorCreators.selectResourceMapValues(),
        (queryMap, resourceMap) => {
          if (!queryMap
            || !queryMap.getCollection
          ) {
            return [];
          }
          return queryMap.getCollection.map(item => resourceMap[item.id]);
        },
      );
    },
  },
});

let modelMapEx : {
  querchy : QuerchyX1,
  cacher : CacherX1,
};

export const createModelMapEx = () => {
  if (modelMapEx) {
    return modelMapEx;
  }
  const querchy = new QuerchyX1({
    commonConfig: {
      defaultBuildUrl: (modelBaseUrl, action) => {
        if (
          action.crudType === 'create'
          || action.crudType === 'getCollection'
        ) {
          return modelBaseUrl;
        }
        return `${modelBaseUrl}/${action.resourceId}`;
      },
      defaultQueryRunner: new AxiosRunnerX1(),
      queryRunners: {
        runnerFor200Error: new AxiosRunnerX1(
          (config, cancelTokenSource) => axios
          .request({
            ...config.rawConfigs,
            cancelToken: cancelTokenSource.token,
          })
          .then((rawResponse) => {
            if (rawResponse.data && rawResponse.data.error) {
              const error = <any>new Error(rawResponse.data.error);
              error.config = config;
              error.response = rawResponse;
              return <any>Promise.reject(error);
            }
            return {
              ...rawResponse,
              rawResponse,
              config,
            };
          })
          .catch((e) => {
            e.config = config;
            return Promise.reject(e);
          }),
        ),
      },
      actionTypePrefix: '@@appex/App/',
    },
    baseSelector: (s) => {
      return s.global[rootSliceKey];
    },
    models: {
      session: {
        ...getSharedInfo('./api/sessions'),
        queryBuilderName: 'forSession',
        featureDeps: {
          getId: () => 'me',
        },
      },
      user: getSharedInfo('./api/users'),
      userSetting: {
        ...getSharedInfo('./api/userSettings'),
        featureDeps: {
          getId: (action) => {
            return (
              action.response
              && action.response.data
              && action.response.data.type
            );
          },
          parseResponse: (s, action) => {
            return {
              update: (
                (
                  action.response
                  && action.response.data
                ) || []
              ).reduce((m, item) => ({ ...m, [item.type]: item }), {}),
            };
          },
        },
      },
      recoveryToken: getSharedInfo('./api/recoveryTokens'),
      challengeRecoveryToken: getSharedInfo('./api/challengeRecoveryTokens'),
      resetPasswordRequest: getSharedInfo('./api/resetPasswordRequests'),
      organization: getSharedInfo('./api/organizations'),
      project: getSharedInfo('./api/projects'),
      memo: getSharedInfo('./api/memos'),
    },
    queryBuilders: {
      defaultBuilder: {
        buildRequestConfig: [
          ({ action, runnerType, commonConfig, models, modelRootState, requestConfig }, next) => {
            const nextCfg = next(requestConfig);
            if (nextCfg && !nextCfg.fromCache) {
              nextCfg.headers = {
                ...getHeaders(),
                ...nextCfg.headers,
              };
            }
            return nextCfg;
          },
          crudUpdateCacheCollectionT1.getBuildRequestConfigMiddleware(),
        ],
      },
      forSession: {
        queryRunner: 'runnerFor200Error',
        buildRequestConfig: [
          ({ action, runnerType, commonConfig, models, modelRootState, requestConfig }, next) => {
            const nextCfg = next(requestConfig);
            if (nextCfg && !nextCfg.fromCache) {
              nextCfg.headers = {
                ...getHeaders(),
                ...nextCfg.headers,
              };
            }
            return nextCfg;
          },
          crudUpdateCacheCollectionT1.getBuildRequestConfigMiddleware(),
        ],
      },
      forExtra: {
        queryRunner: 'runnerFor200Error',
        buildRequestConfig: [],
      },
    },
    extraActionCreators: {
      [INIT_FUNC]: (models) => {
        // console.log('models :', models);
      },
      queryInfos: {
        extraQuery1: {
          actionCreator: (options?) => ({ options }),
          queryBuilderName: 'forExtra',
          globalMerger: (s) => {
            return s;
          },
        },
      },
      actionInfos: {
        extraAction1: {
          actionCreator: (options) => {
            return {
              cacheChange: null,
            };
          },
        },
      },
    },
  });
  const cacher = new CacherX1(querchy, {
    session: {
      selectMe: {
        creatorCreator: (baseSelector, builtinSelectorCreators) => {
          return () => createSelector(
            builtinSelectorCreators.selectResourceMapValues(),
            resourceMap => resourceMap && resourceMap.me,
          );
        },
      },
      selectIsAuthenticated: {
        creatorCreator: (baseSelector, builtinSelectorCreators) => {
          return () => createSelector(
            builtinSelectorCreators.selectResourceMapValues(),
            resourceMap => !!(resourceMap && resourceMap.me),
          );
        },
      },
    },
    user: {
      selectMyUser: {
        creatorCreator: (baseSelector, builtinSelectorCreators) => {
          return () => createSelector(
            builtinSelectorCreators.selectResourceMapValues(),
            resourceMap => !!(resourceMap && resourceMap.me),
          );
        },
      },
    },
    organization: {
      selectCurrentOrganization: {
        creatorCreator: (baseSelector, builtinSelectorCreators) => {
          return () => createSelector(
            builtinSelectorCreators.selectQueryMapValues(),
            builtinSelectorCreators.selectResourceMapValues(),
            (queryMap, resourceMap) => {
              if (!queryMap
                || !queryMap.getCollection
              ) {
                return undefined;
              }
              return queryMap.getCollection.find(
                item => resourceMap[item.id] && resourceMap[item.id].name === 'default',
              );
            },
          );
        },
      },
    },
  });

  return modelMapEx = {
    querchy,
    cacher,
  };
};

export default createModelMapEx();
