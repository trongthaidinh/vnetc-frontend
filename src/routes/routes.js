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
import ProjectCategory from '~/pages/ProjectCategory';
import Contact from '~/pages/Contact';
import Teams from '~/pages/Teams';
import IndustryNews from '~/pages/IndustryNews';
import NewsDetail from '~/pages/NewsDetail';
import ProductDetail from '~/pages/ProductDetail';
import Introduction from '~/pages/Introduction';
import Login from '~/pages/Admin/Login';
import Dashboard from '~/pages/Admin/Dashboard';
import AddNavigation from '~/pages/Admin/Navigation/AddNavigation';
import ServiceDetail from '~/pages/ServiceDetail';
import ServiceCategory from '~/pages/ServiceCategory';
import Project from '~/pages/Project';
import ProjectDetail from '~/pages/ProjectDetail';
import Product from '~/pages/Product';
import NavigationList from '~/pages/Admin/Navigation/NavigationList';
import EditNavigation from '~/pages/Admin/Navigation/EditNavigation';
import ProductList from '~/pages/Admin/Products/ProductList';
import EditProduct from '~/pages/Admin/Products/EditProduct';
import AddProduct from '~/pages/Admin/Products/AddProduct';
import NewsList from '~/pages/Admin/News/NewsList';
import AddNews from '~/pages/Admin/News/AddNews';
import UpdateNews from '~/pages/Admin/News/UpdateNews';
import ServiceList from '~/pages/Admin/Services/ServiceList';
import AddService from '~/pages/Admin/Services/AddService';
import UpdateService from '~/pages/Admin/Services/UpdateService';
import PartnerList from '~/pages/Admin/Partners/ParnerList/PartnerList';
import AddPartner from '~/pages/Admin/Partners/AddPartner';
import UpdateProject from '~/pages/Admin/Projects/UpdateProject';
import ProjectList from '~/pages/Admin/Projects/ProjectList';
import AddProject from '~/pages/Admin/Projects/AddProject';
import UserList from '~/pages/Admin/Users/UserList';
import AddUser from '~/pages/Admin/Users/AddUser';
import UpdateUser from '~/pages/Admin/Users/UpdateUser';
import VideoList from '~/pages/Admin/Library/Videos/VideoList';
import ImageList from '~/pages/Admin/Library/Images/ImageList';
import AddImage from '~/pages/Admin/Library/Images/AddImage';
import AddVideo from '~/pages/Admin/Library/Videos/AddVideo';
import ChangePassword from '~/pages/Admin/Users/ChangePassword';
import MessageList from '~/pages/Admin/Messages/MessageList';
import Settings from '~/pages/Admin/Settings';

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
        path: config.routes.productCategory,
        component: Products,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.products} categoryType={1} />,
    },
    { path: config.routes.products, component: Product, layout: OnlyHeaderLayout },
    { path: config.routes.productDetail, component: ProductDetail, layout: OnlyHeaderLayout },
    { path: config.routes.projects, component: Project, layout: OnlyHeaderLayout },
    {
        path: config.routes.projectCategory,
        component: ProjectCategory,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.projects} categoryType={4} />,
    },
    {
        path: config.routes.projectDetail,
        component: ProjectDetail,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.projects} categoryType={4} />,
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
    {
        path: config.routes.serviceDetail,
        component: ServiceDetail,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.services} categoryType={3} />,
    },
    {
        path: config.routes.servicesCategory,
        component: ServiceCategory,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.services} categoryType={3} />,
    },
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
    { path: config.routes.navigationList, component: NavigationList, layout: AdminLayout },
    { path: config.routes.addNavigation, component: AddNavigation, layout: AdminLayout },
    { path: config.routes.editNavigation, component: EditNavigation, layout: AdminLayout },
    { path: config.routes.productList, component: ProductList, layout: AdminLayout },
    { path: config.routes.editProduct, component: EditProduct, layout: AdminLayout },
    { path: config.routes.addProduct, component: AddProduct, layout: AdminLayout },
    { path: config.routes.newsList, component: NewsList, layout: AdminLayout },
    { path: config.routes.addNews, component: AddNews, layout: AdminLayout },
    { path: config.routes.updateNews, component: UpdateNews, layout: AdminLayout },
    { path: config.routes.serviceList, component: ServiceList, layout: AdminLayout },
    { path: config.routes.addService, component: AddService, layout: AdminLayout },
    { path: config.routes.updateService, component: UpdateService, layout: AdminLayout },
    { path: config.routes.partnerList, component: PartnerList, layout: AdminLayout },
    { path: config.routes.addPartner, component: AddPartner, layout: AdminLayout },
    { path: config.routes.updateProject, component: UpdateProject, layout: AdminLayout },
    { path: config.routes.projectList, component: ProjectList, layout: AdminLayout },
    { path: config.routes.addProject, component: AddProject, layout: AdminLayout },
    { path: config.routes.updateUser, component: UpdateUser, layout: AdminLayout },
    { path: config.routes.userList, component: UserList, layout: AdminLayout },
    { path: config.routes.videosList, component: VideoList, layout: AdminLayout },
    { path: config.routes.imagesList, component: ImageList, layout: AdminLayout },
    { path: config.routes.addImage, component: AddImage, layout: AdminLayout },
    { path: config.routes.addVideo, component: AddVideo, layout: AdminLayout },
    { path: config.routes.addUser, component: AddUser, layout: AdminLayout },
    { path: config.routes.changePassword, component: ChangePassword, layout: AdminLayout },
    { path: config.routes.messagesList, component: MessageList, layout: AdminLayout },
    { path: config.routes.settings, component: Settings, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
