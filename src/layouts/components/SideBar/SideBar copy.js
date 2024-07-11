import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import styles from './SideBar.module.scss';
import Menu, { MenuItem } from './Menu';
import { getCategories } from '~/services/categoryService';

const cx = classNames.bind(styles);

function SideBar() {
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCategoryData() {
            try {
                const data = await getCategories();
                setCategoryData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category data:', error);
                setError(error);
                setLoading(false);
            }
        }

        fetchCategoryData();
    }, []);

    const renderMenuItems = () => {
        if (loading) {
            return <MenuItem title="Loading..." />;
        }

        if (error || !categoryData) {
            return <MenuItem title="Error loading categories" />;
        }

        const currentSlug = window.location.pathname.split('/')[2];
        const currentCategory = categoryData.find((category) => category.slug === currentSlug);

        if (!currentCategory) {
            return <MenuItem title="Default Title" to="/default" icon={<FontAwesomeIcon icon={faCircleDot} />} />;
        }

        return (
            <MenuItem
                key={currentCategory.id}
                title={currentCategory.title}
                to={`/${currentSlug}/${currentCategory.slug}`}
                icon={<FontAwesomeIcon icon={faCircleDot} />}
            />
        );
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>{renderMenuItems()}</Menu>
        </aside>
    );
}

export default SideBar;
