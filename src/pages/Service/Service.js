import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getServices } from '~/services/serviceService';
import { getCategoriesByType } from '~/services/categoryService';
import styles from './Service.module.scss';
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

const cx = classNames.bind(styles);

const Service = () => {
    const [serviceItems, setServiceItems] = useState([]);
    const [groupedService, setGroupedService] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    useEffect(() => {
        const fetchCategoriesAndServices = async () => {
            try {
                const categoriesData = await getCategoriesByType(3);
                setCategories(categoriesData);

                const serviceData = await getServices();
                const groupedServiceMap = {};

                serviceData?.forEach((item) => {
                    const serviceType = item.serviceType;
                    if (!groupedServiceMap[serviceType]) {
                        groupedServiceMap[serviceType] = [];
                    }
                    groupedServiceMap[serviceType].push({
                        ...item,
                        image: item.image,
                    });
                });

                setGroupedService(groupedServiceMap);
                setServiceItems(serviceData);
            } catch (error) {
                setError(error);
                console.error('Error fetching categories or services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndServices();
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

    const getCategorySlug = (serviceType) => {
        const category = categories[serviceType];
        return category ? category.slug : '';
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    let filteredServiceItems = serviceItems;
    if (selectedSuggestion === 0) {
        filteredServiceItems = shuffleArray([...serviceItems]);
    } else if (selectedSuggestion === 1) {
        filteredServiceItems = serviceItems.filter((item) => item.views > 10);
    }
    filteredServiceItems = filteredServiceItems.slice(0, 5);

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Dịch vụ | VNETC</title>
                <meta name="description" content="Khám phá các dịch vụ mà chúng tôi cung cấp tại VNETC." />
                <meta name="keywords" content="dịch vụ, VNETC" />
            </Helmet>
            <div className={cx('service-section')}>
                <div className={cx('service-column')}>
                    <h2 className={cx('service-title')}>Dịch vụ</h2>
                    {Object.keys(groupedService).map((serviceType) => {
                        const category = categories[serviceType];
                        if (!category) return null;

                        const servicesInCategory = groupedService[serviceType];
                        const shouldLoop = servicesInCategory.length > 3;

                        return (
                            <div key={serviceType} className={cx('service-category')}>
                                <Title
                                    text={category.name}
                                    showSeeAll={true}
                                    slug={`${routes.services}/${category.slug}`}
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
                                    {groupedService[serviceType]?.slice(0, 6).map((item, index) => (
                                        <SwiperSlide key={index} className={cx('slide')}>
                                            <Link to={`${routes.services}/${category.slug}/${item._id}`}>
                                                <Card
                                                    title={item.name}
                                                    summary={item.summary}
                                                    image={item.image}
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
                    <ButtonGroup buttons={['Ngẫu nhiên', 'Xem nhiều']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-items')}>
                        {filteredServiceItems.map((item, index) => (
                            <Link
                                key={index}
                                to={`${routes.services}/${getCategorySlug(item.serviceType)}/${item._id}`}
                            >
                                <SuggestCard
                                    title={item.name}
                                    summary={item.summary}
                                    image={item.image}
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

export default Service;
