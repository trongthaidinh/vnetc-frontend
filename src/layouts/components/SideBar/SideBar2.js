import React, { useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { useBaseRoute } from '~/context/BaseRouteContext';
import { Link, useLocation } from 'react-router-dom';
import { getCategoriesByType } from '~/services/categoryService';

const { SubMenu } = Menu;

function SideBar({ categoryType }) {
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseRoute = useBaseRoute();
    const location = useLocation();

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

    const getIconStyle = (active) => ({
        marginRight: 8,
        color: active ? '#e31a2a' : '#2d2e8a',
    });

    const getTextStyle = (active) => ({
        fontWeight: 600,
        color: active ? '#0866ff' : 'inherit',
    });

    const renderMenuItems = () => {
        if (loading) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        minHeight: '100px',
                    }}
                >
                    <Spin size="small" />
                </div>
            );
        }

        if (error || !categoriesData) {
            return <div>Error loading data</div>;
        }

        return categoriesData.map((category) => {
            const isActive = location.pathname.includes(category.slug);

            return (
                <SubMenu
                    key={category._id}
                    title={
                        <span style={getTextStyle(isActive)}>
                            <FontAwesomeIcon icon={faCircleDot} style={getIconStyle(isActive)} />
                            {category.name}
                        </span>
                    }
                >
                    {category.subcategories && category.subcategories.length > 0 ? (
                        category.subcategories.map((subcategory) => {
                            const subcategoryActive = location.pathname.includes(subcategory.slug);

                            return (
                                <Menu.Item key={subcategory._id}>
                                    <Link
                                        to={`${baseRoute}/${subcategory.slug}`}
                                        style={getTextStyle(subcategoryActive)}
                                    >
                                        <FontAwesomeIcon icon={faCircleDot} style={getIconStyle(subcategoryActive)} />
                                        {subcategory.name}
                                    </Link>
                                </Menu.Item>
                            );
                        })
                    ) : (
                        <Menu.Item key={category._id}>
                            <Link to={`${baseRoute}/${category.slug}`} style={getTextStyle(isActive)}>
                                <FontAwesomeIcon icon={faCircleDot} style={getIconStyle(isActive)} />
                                {category.name}
                            </Link>
                        </Menu.Item>
                    )}
                </SubMenu>
            );
        });
    };

    return (
        <aside style={{ width: '100%', height: '100%' }}>
            <Menu mode="inline" theme="light">
                {renderMenuItems()}
            </Menu>
        </aside>
    );
}

export default SideBar;
