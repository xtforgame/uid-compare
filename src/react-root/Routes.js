import App from './App';
import DesktopMainFrame from './desktop/MainFrame';
import MobileMainFrame from './mobile/MainFrame';
import { forEachNode } from './desktop/navigation';
import { forEachNode as forEachMobileNode } from './mobile/navigation';

const NotFound = () => 'NotFound';
const MobileNotFound = () => 'MobileNotFound';

const desktopRoutes = [];
forEachNode((node) => {
  const {
    path,
    component,
    exact,
  } = node;
  if (path != null && component) {
    desktopRoutes.push({
      component,
      path: `/${path}`,
      exact,
    });
  }
});

desktopRoutes.push({
  component: NotFound,
});

const mobileRoutes = [];
forEachMobileNode((node) => {
  const {
    path,
    component,
    exact,
  } = node;
  if (path != null && component) {
    mobileRoutes.push({
      component,
      path: `/${path}`,
      exact,
    });
  }
});
mobileRoutes.push({
  component: MobileNotFound,
});

export default [{
  component: App,
  routes: [
    {
      component: MobileMainFrame,
      path: '/mobile',
      routes: mobileRoutes,
    },
    {
      component: DesktopMainFrame,
      path: '/',
      routes: desktopRoutes,
    },
  ],
}];
