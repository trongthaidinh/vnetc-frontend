import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getServiceByCategory } from '~/services/serviceService';
import Title from '~/components/Title';
import styles from './ServiceCategory.module.scss';
import Card from '~/components/CardContent/CardContent';
import { getCategoriesByType } from '~/services/categoryService';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';
import { Empty } from 'antd';

const cx = classNames.bind(styles);

function ServiceCategory() {
    const location = useLocation();
    const [service, setService] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [subcategoryId, setSubcategoryId] = useState(null);
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
                let category = categories.find((cat) => cat.slug === slug);

                if (!category) {
                    for (const cat of categories) {
                        const subcategory = cat.subcategories.find((subcat) => subcat.slug === slug);
                        if (subcategory) {
                            setCategoryId(cat._id);
                            setSubcategoryId(subcategory._id);
                            setCategoryName(subcategory.name);
                            return;
                        }
                    }
                } else {
                    setCategoryId(category._id);
                    setSubcategoryId(null); // Reset subcategoryId if a parent category is selected
                    setCategoryName(category.name);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        if (slug) {
            fetchCategory();
        }
    }, [slug]); // Re-fetch category whenever the slug changes

    useEffect(() => {
        async function fetchServiceCategory() {
            try {
                let data = [];
                if (subcategoryId) {
                    data = await getServiceByCategory(subcategoryId);
                } else if (categoryId) {
                    data = await getServiceByCategory(categoryId);

                    if (!Array.isArray(data) || data.message === 'No services found') {
                        const categories = await getCategoriesByType(3);
                        const parentCategory = categories.find((cat) => cat._id === categoryId);

                        if (parentCategory && parentCategory.subcategories) {
                            const subcategoryServices = await Promise.all(
                                parentCategory.subcategories.map(async (subcat) => {
                                    const services = await getServiceByCategory(subcat._id);
                                    if (Array.isArray(services) && services.length > 0) {
                                        return services.filter((service) => service._id || service.name);
                                    } else {
                                        return null;
                                    }
                                }),
                            );

                            data = subcategoryServices.filter(Boolean).flat();
                        }
                    }
                }
                setService(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        }

        if (categoryId || subcategoryId) {
            fetchServiceCategory();
        }
    }, [categoryId, subcategoryId, slug]);

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
        if (currentServiceCategory.length === 0) {
            return (
                <>
                    <div />
                    <Empty className={cx('empty-element')} description="Không có dịch vụ để hiển thị" />
                    <div />
                </>
            );
        }

        return currentServiceCategory.map((serviceItem, index) => (
            <Link to={`${routes.services}/${slug}/${serviceItem._id}`} key={serviceItem._id}>
                <Card
                    key={index}
                    title={serviceItem.name}
                    image={serviceItem.image}
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
