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

const cx = classNames.bind(styles);

const Service = () => {
    const [serviceItems, setServiceItems] = useState([]);
    const [groupedService, setGroupedService] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState('Nổi bật');

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
                        createdAt: new Date(item.createdAt).getTime(),
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

    const handleButtonClick = (type) => {
        setSelectedSuggestion(type);
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const filteredServiceItems = serviceItems
        .filter((item) => {
            if (selectedSuggestion === 'Nổi bật') {
                return item.isFeatured;
            }
            if (selectedSuggestion === 'Xem nhiều') {
                return item.views > 10;
            }
            return true;
        })
        .slice(0, 5);

    return (
        <article className={cx('wrapper')}>
            <div className={cx('service-section')}>
                <div className={cx('service-column')}>
                    <h2 className={cx('service-title')}>Tin Tức</h2>
                    {Object.keys(groupedService).map((serviceType) => {
                        const category = categories[serviceType];
                        if (!category) return null;
                        return (
                            <div key={serviceType} className={cx('service-category')}>
                                <Title
                                    text={category.name}
                                    showSeeAll={true}
                                    slug={`${routes.services}/${category.slug}`}
                                    categoryId={category._id}
                                />
                                <div className={cx('service-items')}>
                                    {groupedService[serviceType]?.slice(0, 6).map((item, index) => (
                                        <Link key={index} to={`${routes.services}/${category.slug}/${item._id}`}>
                                            <Card
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
                        );
                    })}
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <ButtonGroup buttons={['Nổi bật', 'Xem nhiều']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-items')}>
                        {filteredServiceItems.map((item, index) => (
                            <Link key={index} to={`/service/${item._id}`}>
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
