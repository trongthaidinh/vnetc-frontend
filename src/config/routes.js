const routes = {
    //Admin
    admin: '/admin',
    dashboard: '/admin/dashboard',
    mainMenu: '/admin/main-navigation',
    subMenu: '/admin/sub-navigation',
    addNavigation: '/admin/add-navigation',
    //Client
    home: '/',
    about: '/gioi-thieu',
    introduction: '/gioi-thieu/tong-quan',
    history: '/gioi-thieu/lich-su',
    organizational: '/gioi-thieu/so-do-to-chuc',
    vision: '/gioi-thieu/tam-nhin-su-menh-gia-tri',
    capacityProfile: '/gioi-thieu/ho-so-nang-luc',
    qualityGoals: '/gioi-thieu/muc-tieu-chat-luong',
    products: '/san-pham',
    productDetail: '/san-pham/:id',
    news: '/tin-tuc',
    newsDetail: `/tin-tuc/:category/:id`,
    newsCategory: `/tin-tuc/:slug`,
    search: '/tim-kiem',
    projects: '/du-an-va-nang-luc',
    projectCategory: '/du-an-va-nang-luc/:slug',
    projectDetail: '/du-an-va-nang-luc/:category/:id',
    services: '/dich-vu',
    serviceDetail: '/dich-vu/:category/:id',
    servicesCategory: `/dich-vu/:slug`,
    teams: '/doi-ngu',
    error404: '/404',
    contact: '/lien-he',
};

export default routes;
