import { Redirect } from 'react-router-dom';
import App from './App';
import DesktopMainFrame from './desktop/MainFrame';
import MobileMainFrame from './mobile/MainFrame';
import { navigation as desktopNavigation, forEachNode } from './desktop/navigation';
import { navigation as mobileNavigation, forEachNode as forEachMobileNode } from './mobile/navigation';

const NotFound = () => 'NotFound';
const MobileNotFound = NotFound;

export default [{
  component: App,
  routes: [
    ...mobileNavigation,
    ...desktopNavigation,
    {
      component: NotFound,
    },
    // {
    //   component: DesktopMainFrame,
    //   path: '/',
    //   routes: desktopRoutes,
    // },
  ],
}];
