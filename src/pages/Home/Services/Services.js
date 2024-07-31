import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Services.module.scss';
import ServiceItem from './ServiceItem';
import { getServices } from '~/services/serviceService';
import { getCategoriesByType } from '~/services/categoryService';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

const Services = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServicesAndCategories = async () => {
            try {
                const [serviceData, categoriesData] = await Promise.all([getServices(), getCategoriesByType(3)]);

                setServices(serviceData);
                setCategories(categoriesData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchServicesAndCategories();
    }, []);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const categoryToServiceMap = categories.reduce((acc, category, indexCategory) => {
        const categoryServices = services.filter((service) => service.serviceType === indexCategory);
        if (categoryServices.length > 0) {
            acc.push({
                ...category,
                services: categoryServices,
            });
        }
        return acc;
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Dịch vụ" showSeeAll={true} slug={routes.services} />
                <div className={cx('service-list')}>
                    {categoryToServiceMap.map((category) => (
                        <ServiceItem
                            key={category._id}
                            image={category.services[0].image}
                            name={category.name}
                            slug={category.slug}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
