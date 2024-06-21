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
                const data = await getServices(); // Hàm lấy dữ liệu từ API
                console.log(data);
                setServices(data); // Lưu dữ liệu vào state
                setLoading(false); // Kết thúc loading
            } catch (err) {
                setError(err); // Xử lý lỗi
                setLoading(false);
            }
        };

        fetchServices(); // Gọi hàm lấy dữ liệu
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Hiển thị khi đang loading
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Hiển thị khi có lỗi
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Dịch vụ" />
                <div className={cx('service-list')}>
                    {services.map((service) => (
                        <Service
                            key={service.id} // Key của mỗi service là id (giả sử)
                            image={service.image} // Ảnh của service
                            title={service.title} // Tiêu đề của service
                            link={`/services/${service.id}`} // Đường dẫn khi click vào service
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
