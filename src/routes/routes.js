// src/routes/routes.js
import config from '~/config';

// Layouts
import { OnlyHeaderLayout, NothingLayout, AdminLayout } from '~/layouts';
import DefaultLayout from '~/layouts/DefaultLayout';

// Pages
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
import Projects from '~/pages/Projects';
import Contact from '~/pages/Contact';
import Teams from '~/pages/Teams';
import SocialEconomicNews from '~/pages/SocialEconomicNews';
import IndustryNews from '~/pages/IndustryNews';
import NewsDetail from '~/pages/NewsDetail';
import ProductDetail from '~/pages/ProductDetail';
import Introduction from '~/pages/Introduction';
import MainMenu from '~/pages/Admin/Menu/MainMenu';
import SubMenu from '~/pages/Admin/Menu/SubMenu';
import AddMenu from '~/pages/Admin/Menu/AddMenu';
import Login from '~/pages/Admin/Login';
import Dashboard from '~/pages/Admin/Dashboard';

// Public Routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.about,
        component: About,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.history,
        component: History,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.vision,
        component: Vision,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.products,
        component: Products,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.products} categoryType={1} />,
    },
    { path: config.routes.productDetail, component: ProductDetail, layout: OnlyHeaderLayout },
    {
        path: config.routes.projects,
        component: Projects,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.projects} categoryType={4} />,
    },
    {
        path: config.routes.ongoingProjects,
        component: Projects,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.ongoingProjects} categoryType={4} />,
    },
    {
        path: config.routes.introduction,
        component: Introduction,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.capacityProfile,
        component: Capacity,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.organizational,
        component: Organizational,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.qualityGoals,
        component: Quality,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.newsCategory,
        component: IndustryNews,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.news} categoryType={2} />,
    },
    {
        path: config.routes.newsDetail,
        component: NewsDetail,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.news} categoryType={2} />,
    },
    { path: config.routes.news, component: News, layout: OnlyHeaderLayout },
    { path: config.routes.services, component: Service, layout: OnlyHeaderLayout },
    { path: config.routes.search, component: Search, layout: OnlyHeaderLayout },
    { path: config.routes.error404, component: Error404, layout: NothingLayout },
    { path: config.routes.contact, component: Contact, layout: OnlyHeaderLayout },
    {
        path: config.routes.teams,
        component: Teams,
        layout: OnlyHeaderLayout,
    },
];

// Private Routes
const privateRoutes = [
    { path: config.routes.admin, component: Dashboard, layout: AdminLayout },
    { path: config.routes.dashboard, component: Dashboard, layout: AdminLayout },
    { path: config.routes.login, component: Login, layout: NothingLayout },
    { path: config.routes.mainMenu, component: MainMenu, layout: AdminLayout },
    { path: config.routes.subMenu, component: SubMenu, layout: AdminLayout },
    { path: config.routes.addMenu, component: AddMenu, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
