// src/components/SideBar.js
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import styles from './SideBar.module.scss';
import Menu, { MenuItem } from './Menu';
import { getCategoriesByType } from '~/services/categoryService';
import { useBaseRoute } from '~/context/BaseRouteContext';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

function SideBar({ categoryType }) {
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseRoute = useBaseRoute();

    useEffect(() => {
        async function fetchCategoryData() {
            try {
                const data = await getCategoriesByType(categoryType);
                setCategoriesData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category data:', error);
                setError(error);
                setLoading(false);
            }
        }

        fetchCategoryData();
    }, [categoryType]);

    const renderMenuItems = () => {
        if (loading) {
            return <LoadingScreen />;
        }

        if (error || !categoriesData) {
            return <LoadingScreen />;
        }

        return categoriesData.map((category) => (
            <MenuItem
                key={category._id}
                title={category.name}
                to={`${baseRoute}/${category.slug}`}
                icon={<FontAwesomeIcon icon={faCircleDot} />}
                activeIcon={<FontAwesomeIcon icon={faCircleDot} />}
            />
        ));
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>{renderMenuItems()}</Menu>
        </aside>
    );
}

export default SideBar;
