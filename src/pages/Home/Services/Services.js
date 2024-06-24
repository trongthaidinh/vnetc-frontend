import classNames from 'classnames/bind';
import styles from './Services.module.scss';
import React, { useState, useEffect } from 'react';
import Service from './ServiceItem';
import { getServices } from '~/services/serviceService';
import Title from '~/components/Title';

const cx = classNames.bind(styles);

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Dịch vụ" />
                <div className={cx('service-list')}>
                    {services.map((service) => (
                        <Service
                            key={service.id}
                            image={service.image}
                            title={service.title}
                            link={`/services/${service.id}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
