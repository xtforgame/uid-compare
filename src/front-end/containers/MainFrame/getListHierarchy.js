import { capitalizeFirstLetter } from 'common/utils';

let listHierarchy = null;

export default (routesDefine) => {
  if(listHierarchy){
    return listHierarchy;
  }

  listHierarchy = [];

  let toListDefine = (routeDefine, currentList = listHierarchy, level = 0, parents = []) => {
    let {
      routeViews,
      name,
      path,
      navbar,
    } = routeDefine;

    let listData = null;
    let newLevel = level;
    let newParents = parents;
    let newList = currentList;

    if (navbar) {
      if (navbar === true) {
        navbar = {};
      }
      let title = navbar.title || capitalizeFirstLetter(name);
      listData = {
        name,
        path,
        title,
        routeDefine,
        level,
        parents,
      };
      newLevel = level + 1;
      newParents = parents.concat([listData]);
      currentList.push(listData);
    }

    if (routeViews) {
      if (listData) {
        listData.children = [];
        newList = listData.children;
      }

      routeViews.map(routeView => {
        routeView.routes.map(route => {
          toListDefine(route, newList, newLevel, newParents);
        });
      });
    }
  }

  toListDefine(routesDefine);

  return listHierarchy;
}
