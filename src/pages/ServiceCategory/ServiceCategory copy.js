import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Title from '~/components/Title';
import styles from './ServiceCategory.module.scss';
import { Link } from 'react-router-dom';
import Card from '~/components/CardContent/CardContent';
import { getCategoriesByType } from '~/services/categoryService';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

function ServiceCategory() {
    const location = useLocation();
    const [service, setService] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const servicePerPage = 12;

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        return parts.length > 2 ? parts[2] : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesByType(3);
                const category = categories.find((cat) => cat.slug === slug);
                if (category) {
                    setCategoryId(category._id);
                    setCategoryName(category.name);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        if (slug) {
            fetchCategory();
        }
    }, [slug]);

    const indexOfLastService = currentPage * servicePerPage;
    const indexOfFirstService = indexOfLastService - servicePerPage;
    const currentServiceCategory = service.slice(indexOfFirstService, indexOfLastService);

    const totalPages = Math.ceil(service.length / servicePerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderServiceCategory = () => {
        return currentServiceCategory.map((serviceItem) => (
            <Link to={`${routes.services}/${slug}/${serviceItem._id}`} key={serviceItem._id}>
                <Card
                    title={serviceItem.title}
                    image={serviceItem.images}
                    summary={serviceItem.summary}
                    createdAt={new Date(serviceItem.createdAt).getTime()}
                    views={serviceItem.views}
                />
            </Link>
        ));
    };

    const renderPagination = () => {
        return (
            <div className={cx('pagination')}>
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <div
                        key={index}
                        className={cx('pageButton', { active: currentPage === index + 1 })}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage + 1)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        );
    };

    return (
        <div className={cx('container')}>
            <Helmet>
                <title>{categoryName} | VNETC</title>
                <meta name="description" content={`Xem các dịch vụ liên quan đến ${categoryName} trên VNETC.`} />
                <meta name="keywords" content={`${categoryName}, dịch vụ, VNETC`} />
            </Helmet>
            <Title text={categoryName} />
            <div className={cx('serviceGrid')}>{renderServiceCategory()}</div>
            {renderPagination()}
        </div>
    );
}

export default ServiceCategory;
