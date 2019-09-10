import {
  CommonConfig,
  QueryBuilderDefinition,
  QcStore,

  BaseSelector,
  BuiltinSelectorCreators,
  BuiltinSelectors,

  FeatureGroup,
  FeatureGroupTypes,
} from 'querchy';

import CrudT1 from 'querchy/exports/features/CrudT1';
import UpdateCacheT1 from 'querchy/exports/features/UpdateCacheT1';
import CollectionT1 from 'querchy/exports/features/CollectionT1';

import {
  MakeResourceModelType,
  TypeHelperClass,
} from 'querchy/exports/type-helpers';

type CrudUpdateCacheTypesCollectionT1 = FeatureGroupTypes<
  CrudT1,
  UpdateCacheT1,
  CollectionT1
>;

export type MyStateX1 = any;

export interface CommonConfigX1 extends CommonConfig {}

export type CommonResourceModelT1 = MakeResourceModelType<
  CommonConfigX1,
  FeatureGroup<CrudUpdateCacheTypesCollectionT1>
>;

export type ModelMapX1 = {
  session: CommonResourceModelT1;
  user: CommonResourceModelT1;
  userSetting: CommonResourceModelT1;
  recoveryToken: CommonResourceModelT1;
  challengeRecoveryToken: CommonResourceModelT1;
  resetPasswordRequest: CommonResourceModelT1;
  organization: CommonResourceModelT1;
  project: CommonResourceModelT1;
  memo: CommonResourceModelT1;
};

export type QueryBuilderMapX1 = {
  defaultBuilder : QueryBuilderDefinition<CommonConfigX1, ModelMapX1>;
  forExtra : QueryBuilderDefinition<CommonConfigX1, ModelMapX1>;
} & {
  [s : string] : QueryBuilderDefinition<CommonConfigX1, ModelMapX1>;
};

// ===========================================

export type ExtraSelectorCreatorCreatorX1<ReturnType> = (
  baseSelector : BaseSelector<ModelMapX1>,
  builtinSelectorCreators: BuiltinSelectorCreators<MyStateX1>,
  builtinSelectors: BuiltinSelectors<MyStateX1>,
) => () => (state : any) => ReturnType;

export type ExtraSelectorInfoForModelX1<ReturnType> = {
  creatorCreator: ExtraSelectorCreatorCreatorX1<ReturnType>,
};

export type ExtraSelectorInfosForModelX1 = {
  session: {
    selectMe: ExtraSelectorInfoForModelX1<any>,
    selectIsAuthenticated: ExtraSelectorInfoForModelX1<boolean>,
  },
  user: {
    selectMyUser: ExtraSelectorInfoForModelX1<any>,
  },
  organization: {
    selectCurrentOrganization: ExtraSelectorInfoForModelX1<any>,
  },
};

// ===========================================

export const typeHelperClassX1 = new TypeHelperClass<
  CommonConfigX1,
  ModelMapX1,
  QueryBuilderMapX1,
  {}, // ExtraQueryInfosX1,
  {}, // ExtraActionInfosX1,

  any, // ExtraDependenciesX1,
  MyStateX1,
  ExtraSelectorInfosForModelX1
>();

export type StoreX1 = QcStore<MyStateX1>;

// ===========================================

// just for demonstrating how to do inheritance

export class AxiosRunnerX1 extends typeHelperClassX1.GetAxiosRunnerClass() {}

export class QuerchyX1 extends typeHelperClassX1.GetQuerchyClass() {}

export class CacherX1 extends typeHelperClassX1.GetCacherClass() {
  // reduce(action: QcAction, state: any) : any {
  //   return super.reduce(action, state);
  // }
}
