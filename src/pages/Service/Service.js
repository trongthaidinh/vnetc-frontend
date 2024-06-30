import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getServices } from '~/services/serviceService';
import styles from './Service.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';

const cx = classNames.bind(styles);

const Service = () => {
    const [serviceItems, setServiceItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await getServices();
                setServiceItems(data);
            } catch (error) {
                setError('Lỗi khi tải dữ liệu');
                console.error('Error fetching service:', error);
            }
        };

        fetchService();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <article className={cx('wrapper')}>
            <div className={cx('service-section')}>
                <div className={cx('service-column')}>
                    <h2 className={cx('service-title')}>Dịch Vụ</h2>
                    <div className={cx('service-accreditation')}>
                        <Title text="Kiểm Định" />
                        <div className={cx('service-items')}>
                            {serviceItems.map((item, index) => (
                                <Card
                                    key={index}
                                    title={item.title}
                                    image={item.image}
                                    description={item.description}
                                    link={item.link}
                                    createdAt={item.createdAt}
                                    readers={item.readers}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={cx('service-test')}>
                        <Title text="Kiểm thử" />
                        <div className={cx('service-items')}>
                            {serviceItems.map((item, index) => (
                                <Card
                                    key={index}
                                    title={item.title}
                                    image={item.image}
                                    description={item.description}
                                    link={item.link}
                                    createdAt={item.createdAt}
                                    readers={item.readers}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={cx('service-calibration')}>
                        <Title text="Hiệu chuẩn" />
                        <div className={cx('service-items')}>
                            {serviceItems.map((item, index) => (
                                <Card
                                    key={index}
                                    title={item.title}
                                    image={item.image}
                                    description={item.description}
                                    link={item.link}
                                    createdAt={item.createdAt}
                                    readers={item.readers}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <div className={cx('suggest-items')}>
                        <ButtonGroup buttons={['Nổi bật', 'Xem nhiều']} />
                        {serviceItems.map((item, index) => (
                            <SuggestCard
                                key={index}
                                title={item.title}
                                image={item.image}
                                description={item.description}
                                link={item.link}
                                createdAt={item.createdAt}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Service;
