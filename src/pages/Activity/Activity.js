import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getActivityByCategory } from '~/services/activityService';
import styles from './Activity.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { getCategoriesByType } from '~/services/categoryService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Helmet } from 'react-helmet';
import 'swiper/css';
import 'swiper/css/autoplay';
import { getNewsPagination } from '~/services/newsService';

const cx = classNames.bind(styles);

const Activity = () => {
    const [, setActivityItems] = useState([]);
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newsCategories, setNewsCategories] = useState([]);
    const [groupedActivity, setGroupedActivity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    useEffect(() => {
        const fetchCategoriesAndActivity = async () => {
            try {
                const categoriesData = await getCategoriesByType(5);
                const newsCategoriesData = await getCategoriesByType(2);

                setNewsCategories(newsCategoriesData);
                setCategories(categoriesData);

                const groupedActivityMap = {};

                await Promise.all(
                    categoriesData.map(async (category) => {
                        const activityData = await getActivityByCategory(category._id);
                        groupedActivityMap[category._id] = activityData.actions.map((item) => ({
                            ...item,
                            image: item.images,
                        }));
                    }),
                );
                const newsData = await getNewsPagination(1, 10);

                setGroupedActivity(groupedActivityMap);
                setNews(newsData.news);
                setActivityItems(Object.values(groupedActivityMap).flat());
            } catch (error) {
                setError(error);
                console.error('Error fetching activity:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndActivity();
    }, []);

    const handleButtonClick = (index) => {
        setSelectedSuggestion(index);
    };

    const getCategorySlug = (categoryId) => {
        const category = newsCategories.find((category) => categoryId === category._id);
        return category ? category.slug : '';
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const filteredNewsItems = news
        .filter((item) => {
            if (selectedSuggestion === 0) {
                return item.isFeatured;
            }
            if (selectedSuggestion === 1) {
                return item.views > 10;
            }
            return true;
        })
        .slice(0, 5);

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Hoạt Động | VNETC</title>
                <meta
                    name="description"
                    content="Cập nhật những hoạt động sơ kết, tổng kết họp hành và vui chơi giải trí về công ty chúng tôi."
                />
                <meta name="keywords" content="hoạt động, cập nhật, VNETC" />
            </Helmet>
            <div className={cx('activity-section')}>
                <div className={cx('activity-column')}>
                    <h2 className={cx('activity-title')}>Hoạt Động</h2>
                    {categories.map((category) => {
                        const slides = groupedActivity[category._id]?.slice(0, 6) || [];

                        if (slides.length === 0) return null;

                        const shouldLoop = slides.length > 3;

                        return (
                            <div key={category._id} className={cx('activity-category')}>
                                <Title
                                    text={category.name || 'Loading...'}
                                    showSeeAll={true}
                                    slug={`${routes.activity}/${category.slug}`}
                                    categoryId={category._id}
                                />
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={3}
                                    breakpoints={{
                                        1280: { slidesPerView: 3 },
                                        1024: { slidesPerView: 3 },
                                        768: { slidesPerView: 2 },
                                        0: { slidesPerView: 1 },
                                    }}
                                    loop={shouldLoop}
                                    modules={[Autoplay]}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                >
                                    {slides.map((item, index) => (
                                        <SwiperSlide key={index} className={cx('slide')}>
                                            <Link to={`${routes.activity}/${category.slug}/${item._id}`}>
                                                <Card
                                                    title={item.title}
                                                    summary={item.summary}
                                                    image={item.images}
                                                    createdAt={item.createdAt}
                                                    views={item.views}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <ButtonGroup buttons={['Nổi bật', 'Xem nhiều']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-items')}>
                        {filteredNewsItems.map((item, index) => (
                            <Link key={index} to={`${routes.news}/${getCategorySlug(item.categoryId)}/${item._id}`}>
                                <SuggestCard
                                    title={item.title}
                                    summary={item.summary}
                                    image={item.images}
                                    createdAt={item.createdAt}
                                    views={item.views}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Activity;
