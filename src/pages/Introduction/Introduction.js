import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Title from '~/components/Title';
import styles from './Introduction.module.scss';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
// import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Introduction = () => {
    // const { slug } = useParams();
    const [pageContent, setPageContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                // const data = await getPageContent(slug);

                // Replace with actual API call once available
                const data = {
                    _id: '612f3b3c21e3e13e5f85ae04',
                    title: 'Tổng Quan Về VNETC',
                    content: `<img
                src="https://res.cloudinary.com/ddmzboxzu/image/upload/v1721325167/iwo1jihkzk8jskxr6j7o.png"
                alt="Trụ sở công ty VNETC"
            />
            <p>
                <strong>1. Trụ sở chính: </strong> Số 22 Trần Hữu Dực – Tổ DP 5 – P. Tân Lợi – Tp Buôn Ma Thuột – tỉnh
                Đăk Lăk – Việt Nam.
            </p>
            <ul>
                <li>Tel/Fax: +84-262-3 97.71.71</li>
                <li>Hotline: +84-968.17.47.47/+84-905.174.001</li>
                <li>Website: vietnametc.com </li>
                <li>Email: vietnam.etc.ltd@gmail.com</li>
            </ul>
            <p>
                <strong>2. Văn phòng đại diện tại Quảng Ngãi: </strong> 303 Phan Đình Phùng, P. Chánh Lộ, TP. Quảng
                Ngãi, T. Quảng Ngãi.
            </p>
            <ul>
                <li>Trưởng VP: Ông Nguyễn Vân Hải </li>
                <li>ĐT: 0942503822 </li>
                <li>Website: vietnametc.com </li>
                <li>Email: vanhai09031993@gmail.com</li>
            </ul>
            <p>
                <strong>3. Chi nhánh Đà Nẵng: </strong> 20 Đa Phước 2, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, TP Đà Nẵng.
            </p>
            <ul>
                <li>Giám đốc: Ông Phùng Như Thuỷ </li>
                <li>ĐT: 0905061997</li>
                <li>Website: vietnametc.com </li>
                <li>Email: nhuthuyant@gmail.com</li>
            </ul>
                `,
                };
                setPageContent(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching product detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageContent();
    }); // will be replace in the future
    // }, [slug]);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <article className={cx('wrapper')}>
            <Title text={pageContent.title} />
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        </article>
    );
};

export default Introduction;
