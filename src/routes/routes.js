import config from '~/config';

//Layout
import { OnlyHeaderLayout } from '~/layouts';

// Page
import Home from '~/pages/Home';
import About from '~/pages/About';
import News from '~/pages/News';
import Service from '~/pages/Service';
import History from '~/pages/History';
import Organizational from '~/pages/Organizational';
import Vision from '~/pages/Vission';
import Capacity from '~/pages/Capacity';
import Quality from '~/pages/Quality';
import Search from '~/pages/Search';
import Products from '~/pages/Products';
import Error404 from '~/pages/Error404';
import NothingLayout from '~/layouts/NothingLayout';
import Projects from '~/pages/Projects';
import Contact from '~/pages/Contact';
import Teams from '~/pages/Teams';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: OnlyHeaderLayout },
    { path: config.routes.about, component: About },
    { path: config.routes.history, component: History },
    { path: config.routes.vision, component: Vision },
    { path: config.routes.products, component: Products },
    { path: config.routes.projects, component: Projects },
    { path: config.routes.ongoingProjects, component: Projects },
    { path: config.routes.introduction, component: About },
    { path: config.routes.capacityProfile, component: Capacity },
    { path: config.routes.organizational, component: Organizational },
    { path: config.routes.qualityGoals, component: Quality },
    { path: config.routes.news, component: News, layout: OnlyHeaderLayout },
    { path: config.routes.services, component: Service, layout: OnlyHeaderLayout },
    { path: config.routes.search, component: Search, layout: OnlyHeaderLayout },
    { path: config.routes.error404, component: Error404, layout: NothingLayout },
    { path: config.routes.contact, component: Contact, layout: OnlyHeaderLayout },
    { path: config.routes.teams, component: Teams },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
