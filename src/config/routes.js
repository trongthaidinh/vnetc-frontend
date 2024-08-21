const routes = {
    //Admin
    admin: '/admin',
    dashboard: '/admin/dashboard',
    navigationList: '/admin/navigation-list',
    addNavigation: '/admin/add-navigation',
    editNavigation: '/admin/edit-navigation/:id',
    productList: '/admin/product-list',
    addProduct: '/admin/add-product',
    editProduct: '/admin/edit-product/:id',
    newsList: '/admin/news-list',
    addNews: '/admin/add-news',
    updateNews: '/admin/update-news/:id',
    serviceList: '/admin/service-list',
    addService: '/admin/add-service',
    updateService: '/admin/update-service/:id',
    partnerList: '/admin/partner-list',
    addPartner: '/admin/add-partner',
    updateProject: '/admin/update-project/:id',
    projectList: '/admin/project-list',
    addProject: '/admin/add-project',
    updateLegal: '/admin/update-legal/:id',
    legalList: '/admin/legal-list',
    addLegal: '/admin/add-legal',
    updateUser: '/admin/update-user/:id',
    changePassword: '/admin/change-password',
    userList: '/admin/user-list',
    addUser: '/admin/add-user',
    videosList: '/admin/videos-list',
    imagesList: '/admin/images-list',
    addImage: '/admin/add-image',
    addVideo: '/admin/add-video',
    messagesList: '/admin/messages-list',
    settings: '/admin/settings',
    pageList: '/admin/page-list',
    addPage: '/admin/add-page',
    updatePage: '/admin/update-page',
    categoryList: '/admin/category-list',
    addCategory: '/admin/add-category',
    departmentList: '/admin/department-list',
    addDepartment: '/admin/add-department',
    memberList: '/admin/member-list',
    addMember: '/admin/add-member',
    updateMember: '/admin/update-member/:id/:departmentId',
    //User
    home: '/',
    about: '/gioi-thieu',
    introduction: '/gioi-thieu/:slug',
    // products: '/san-pham-va-dich-vu',
    // productCategory: '/san-pham-va-dich-vu/:slug',
    // productDetail: '/san-pham-va-dich-vu/:category/:id',
    news: '/tin-tuc',
    newsDetail: `/tin-tuc/:category/:id`,
    newsCategory: `/tin-tuc/:slug`,
    search: '/search',
    projects: '/du-an',
    projectCategory: '/du-an/:slug',
    projectDetail: '/du-an/:category/:id',
    services: '/san-pham-va-dich-vu',
    serviceDetail: '/san-pham-va-dich-vu/:category/:id',
    servicesCategory: `/san-pham-va-dich-vu/:slug`,
    legal: '/van-ban-phap-quy',
    legalDetail: '/van-ban-phap-quy/:category/:id',
    legalCategory: `/van-ban-phap-quy/:slug`,
    teams: '/doi-ngu',
    error404: '/404',
    contact: '/lien-he',
};

export default routes;
