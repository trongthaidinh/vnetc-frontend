import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getLegalByType } from '~/services/legalService';
import Title from '~/components/Title';
import styles from './LegalCategory.module.scss';
import { Link } from 'react-router-dom';
import Card from '~/components/CardDocument';
import { getCategoriesByType } from '~/services/categoryService';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';
import { Empty } from 'antd'; // Import Ant Design's Empty component

const cx = classNames.bind(styles);

function LegalCategory() {
    const location = useLocation();
    const [legal, setLegal] = useState([]);
    const [legalType, setLegalType] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const legalPerPage = 9;

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        return parts.length > 2 ? parts[2] : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesByType(1);
                const categoryIndex = categories.findIndex((cat) => cat.slug === slug);
                const category = categories[categoryIndex];
                if (category) {
                    setLegalType(categoryIndex);
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

    useEffect(() => {
        async function fetchLegalCategory() {
            try {
                const data = await getLegalByType(legalType);
                setLegal(data);
            } catch (error) {
                console.error('Error fetching legal:', error);
            }
        }

        fetchLegalCategory();
    }, [legalType]);

    const indexOfLastLegal = currentPage * legalPerPage;
    const indexOfFirstLegal = indexOfLastLegal - legalPerPage;
    const currentLegalCategory = legal.slice(indexOfFirstLegal, indexOfLastLegal);

    const totalPages = Math.ceil(legal.length / legalPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderLegalCategory = () => {
        return currentLegalCategory.map((legalItem) => {
            const imageUrl = legalItem.attachments
                ? `${process.env.REACT_APP_HOST}/${legalItem.attachments
                      .find((attachment) => attachment.file_type === 'img')
                      ?.file_url.replace(/\\/g, '/')}`
                : null;
            return (
                <Link to={`${routes.legal}/${slug}/${legalItem._id}`} key={legalItem._id}>
                    <Card title={legalItem.title} image={imageUrl} summary={legalItem.content} />
                </Link>
            );
        });
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
                <title>{`${categoryName} | VNETC`}</title>
                <meta name="description" content={`Văn bản pháp quy trong danh mục ${categoryName}.`} />
            </Helmet>
            <Title text={categoryName} />
            <div className={cx('legalGrid')}>
                {legal.length > 0 ? (
                    renderLegalCategory()
                ) : (
                    <>
                        <div />
                        <Empty description="Không có văn bản nào để hiển thị" />
                        <div />
                    </>
                )}
            </div>
            {legal.length > 0 && renderPagination()}
        </div>
    );
}

export default LegalCategory;
