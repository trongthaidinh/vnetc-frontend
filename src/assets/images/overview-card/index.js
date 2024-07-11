import routes from '~/config/routes';

const images = [
    {
        imgURL: require('~/assets/images/overview-card/vision.jpg'),
        imgAlt: 'vision image',
        title: 'Tầm nhìn - Sứ mệnh - Giá trị',
        path: routes.vision,
    },
    {
        imgURL: require('~/assets/images/overview-card/organizational.jpg'),
        imgAlt: 'organizational image',
        title: 'Sơ đồ tổ chức',
        path: routes.organizational,
    },
    {
        imgURL: require('~/assets/images/overview-card/qualityGoals.png'),
        imgAlt: 'qualityGoal image',
        title: 'Mục tiêu chất lượng',
        path: routes.qualityGoals,
    },
    {
        imgURL: require('~/assets/images/overview-card/historyDevelop.jpg'),
        imgAlt: 'historyDevelop image',
        title: 'Lịch sử phát triển',
        path: routes.history,
    },
];

export default images;
