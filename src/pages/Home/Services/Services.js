import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import ServiceItem from './ServiceItem';
import { getServices } from '~/services/serviceService';
import { getCategoriesByType } from '~/services/categoryService';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import styles from './Services.module.scss';

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
                <div className={cx('slide-wrapper')}>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={4}
                        breakpoints={{
                            1280: { slidesPerView: 4 },
                            1024: { slidesPerView: 3 },
                            768: { slidesPerView: 2 },
                            0: { slidesPerView: 1 },
                        }}
                        loop={true}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                    >
                        {categoryToServiceMap.map((category) => (
                            <SwiperSlide key={category._id} className={cx('service-slide')}>
                                <ServiceItem
                                    image={category.services[0].image}
                                    name={category.name}
                                    slug={category.slug}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Services;
