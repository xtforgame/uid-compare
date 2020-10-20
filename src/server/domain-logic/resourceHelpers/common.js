/* eslint-disable no-param-reassign */
// import Sequelize from 'sequelize';
import AmmOrm from 'az-model-manager/core';
import createAsuModelDefs from '~/asu-model';

export const modelDef = createAsuModelDefs();


export const isAssociation = (baseModelName, associationModelNameAs) => {
  if (!modelDef.models[baseModelName]) {
    // throw new Error(`Base Model not found: ${baseModelName}`);
    return false;
  }
  if (!modelDef.models[baseModelName].columns[associationModelNameAs]) {
    // throw new Error(`Association Model not found: ${associationModelNameAs}`);
    return false;
  }
  return AmmOrm.isAssociationColumn(modelDef.models[baseModelName].columns[associationModelNameAs].type);
};

export const getAssociationIncludeData = (resourceManager, baseModelName, associationModelNameAs) => {
  if (!modelDef.models[baseModelName]) {
    // throw new Error(`Base Model not found: ${baseModelName}`);
    return null;
  }
  if (!modelDef.models[baseModelName].columns[associationModelNameAs]) {
    // throw new Error(`Association Model not found: ${associationModelNameAs}`);
    return null;
  }
  if (!AmmOrm.isAssociationColumn(modelDef.models[baseModelName].columns[associationModelNameAs].type)) {
    return null;
  }
  const { targetModel } = modelDef.models[baseModelName].columns[associationModelNameAs].type;
  const AssociationModel = resourceManager.getSqlzModel(targetModel);
  return {
    targetModelName: targetModel,
    model: AssociationModel,
    as: associationModelNameAs,
    include: [],
  };
};

export const getAssociationIncludeMap = (resourceManager, baseModelName, associationModelNameAsArray = []) => {
  const includeMap = {};
  associationModelNameAsArray.forEach((item) => {
    let nameAs = item;
    let options = {};
    if (typeof item !== 'string') {
      ({ as: nameAs, ...options } = item);
    }
    const [associationModelNameAs, ...rest] = nameAs.split('.'); // might like 'accountLinks.user'
    if (!includeMap[associationModelNameAs]) {
      includeMap[associationModelNameAs] = getAssociationIncludeData(
        resourceManager,
        baseModelName,
        associationModelNameAs,
      );
      if (rest.length === 0) {
        includeMap[associationModelNameAs] = {
          ...includeMap[associationModelNameAs],
          ...options,
        };
      }
    }
    if (rest.length > 0) {
      includeMap[associationModelNameAs].includeMap = {
        ...includeMap[associationModelNameAs].includeMap,
        ...getAssociationIncludeMap(resourceManager, includeMap[associationModelNameAs].targetModelName, [{
          as: rest.join('.'),
          ...options,
        }]),
      };
    }
  });
  return includeMap;
};

export const associationIncludeMapToArray = (includeMap) => {
  const result = Object.values(includeMap);
  result.forEach((include) => {
    if (include.includeMap) {
      include.include = associationIncludeMapToArray(include.includeMap);
      delete include.includeMap;
    }
  });
  return result;
};

export const getAssociationIncludes = (resourceManager, baseModelName, associationModelNameAsArray = []) => {
  const includeMap = getAssociationIncludeMap(resourceManager, baseModelName, associationModelNameAsArray);
  return associationIncludeMapToArray(includeMap);
};
