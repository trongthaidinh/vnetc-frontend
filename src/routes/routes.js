import config from '~/config';

//Layout
import { OnlyHeaderLayout } from '~/layouts';

// Page
import Home from '~/pages/Home';
import About from '~/pages/About';
import News from '~/pages/News';
import History from '~/pages/History';
import Organizational from '~/pages/Organizational';
import Vision from '~/pages/Vission';
import Capacity from '~/pages/Capacity';
import Quality from '~/pages/Quality';
import Search from '~/pages/Search';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: OnlyHeaderLayout },
    { path: config.routes.about, component: About },
    { path: config.routes.history, component: History },
    { path: config.routes.vision, component: Vision },
    { path: config.routes.capacityProfile, component: Capacity },
    { path: config.routes.organizational, component: Organizational },
    { path: config.routes.qualityGoals, component: Quality },
    { path: config.routes.news, component: News, layout: OnlyHeaderLayout },
    { path: config.routes.search, component: Search, layout: OnlyHeaderLayout },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
