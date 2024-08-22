import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardDocument';
import SuggestCard from '~/components/SuggestCard';
import { getLegals } from '~/services/legalService';
import { getCategoriesByType } from '~/services/categoryService';
import styles from './Legal.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Helmet } from 'react-helmet';
import { getNewsPagination } from '~/services/newsService';

const cx = classNames.bind(styles);

function Legal() {
    const [newsData, setNewsData] = useState([]);
    const [groupedLegal, setGroupedLegal] = useState({});
    const [categories, setCategories] = useState([]);
    const [newsCategories, setNewsCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    useEffect(() => {
        const fetchCategoriesAndLegals = async () => {
            try {
                const categoriesData = await getCategoriesByType(1);
                const categoriesNews = await getCategoriesByType(2);
                setCategories(categoriesData);
                setNewsCategories(categoriesNews);

                const legalData = await getLegals();
                const newsData = await getNewsPagination(1, 10);
                const groupedLegalMap = {};

                legalData?.forEach((item) => {
                    const legalType = item.type;
                    if (!groupedLegalMap[legalType]) {
                        groupedLegalMap[legalType] = [];
                    }
                    groupedLegalMap[legalType].push({
                        ...item,
                        image: item.image,
                    });
                });

                setGroupedLegal(groupedLegalMap);
                setNewsData(newsData);
            } catch (error) {
                setError(error);
                console.error('Error fetching categories or legals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndLegals();
    }, []);

    const handleButtonClick = (index) => {
        setSelectedSuggestion(index);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getCategorySlug = (categoryId) => {
        const category = newsCategories.find((category) => categoryId === category._id);
        console.log(category.slug);
        return category ? category.slug : '';
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    let filteredNewsItems = newsData;
    if (selectedSuggestion === 0) {
        filteredNewsItems = shuffleArray([...newsData]);
    } else if (selectedSuggestion === 1) {
        filteredNewsItems = newsData.filter((item) => item.views > 10);
    }
    filteredNewsItems = filteredNewsItems.slice(0, 5);

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Văn bản pháp quy | VNETC</title>
                <meta name="description" content="Khám phá các dự án của chúng tôi." />
            </Helmet>
            <div className={cx('legal-section')}>
                <div className={cx('legal-column')}>
                    <h2 className={cx('legal-title')}>Văn bản pháp quy</h2>
                    {Object.keys(groupedLegal).map((legalType) => {
                        const category = categories[legalType];
                        if (!category) return null;

                        const legalsInCategory = groupedLegal[legalType];
                        const shouldLoop = legalsInCategory.length > 3;

                        return (
                            <div key={legalType} className={cx('legal-category')}>
                                <Title
                                    text={category.name}
                                    showSeeAll={true}
                                    slug={`${routes.legal}/${category.slug}`}
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
                                    {legalsInCategory?.slice(0, 6).map((item, index) => {
                                        const imageUrl = item.attachments
                                            ? `${process.env.REACT_APP_HOST}/${item.attachments
                                                  .find((attachment) => attachment.file_type === 'img')
                                                  ?.file_url.replace(/\\/g, '/')}`
                                            : null;
                                        return (
                                            <SwiperSlide key={index} className={cx('slide')}>
                                                <Link to={`${routes.legal}/${category.slug}/${item._id}`}>
                                                    <Card title={item.title} summary={item.content} image={imageUrl} />
                                                </Link>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <ButtonGroup buttons={['Ngẫu nhiên', 'Xem nhiều']} onButtonClick={handleButtonClick} />
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
}

export default Legal;
