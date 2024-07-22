import routes from '~/config/routes';

const images = [
    {
        imgURL: require('~/assets/images/overview-card/vision.jpg'),
        imgAlt: 'vision image',
        title: 'Tầm nhìn - Sứ mệnh - Giá trị',
        path: `${routes.about}/tam-nhin-su-menh-gia-tri`,
    },
    {
        imgURL: require('~/assets/images/overview-card/organizational.jpg'),
        imgAlt: 'organizational image',
        title: 'Sơ đồ tổ chức',
        path: `${routes.about}/so-do-to-chuc`,
    },
    {
        imgURL: require('~/assets/images/overview-card/qualityGoals.png'),
        imgAlt: 'qualityGoal image',
        title: 'Mục tiêu chất lượng',
        path: `${routes.about}/muc-tieu-chat-luong`,
    },
    {
        imgURL: require('~/assets/images/overview-card/historyDevelop.jpg'),
        imgAlt: 'historyDevelop image',
        title: 'Lịch sử phát triển',
        path: `${routes.about}/lich-su-phat-trien`,
    },
];

export default images;
