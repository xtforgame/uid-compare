import App from './App';
import DesktopMainFrame from './desktop/MainFrame';
import MobileMainFrame from './mobile/MainFrame';
import { forEachNode } from './desktop/navigation';
import { forEachNode as forEachMobileNode } from './mobile/navigation';

const NotFound = () => 'NotFound';

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

export default [{
  component: App,
  routes: [
    {
      component: MobileMainFrame,
      path: '/mobile',
      routes: mobileRoutes,
    },
    // {
    //   component: NotFound,
    // },
    {
      component: DesktopMainFrame,
      path: '/',
      routes: desktopRoutes,
    },
  ],
}];
