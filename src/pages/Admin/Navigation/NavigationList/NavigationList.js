import React, { useEffect, useState } from 'react';
import { getNavigationLinks } from '~/services/navigationService';
import styles from './NavigationList.module.scss';

const NavigationList = () => {
    const [navigationLinks, setNavigationLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNavigationLinks = async () => {
            try {
                const data = await getNavigationLinks();
                setNavigationLinks(data);
            } catch (error) {
                console.error('Failed to fetch navigation links:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNavigationLinks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.navigationListContainer}>
            <h1>Quản lý Navigation</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Loại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {navigationLinks.map((link) => (
                        <tr key={link.id}>
                            <td>{link.id}</td>
                            <td>{link.title}</td>
                            <td>{link.type}</td>
                            <td>
                                <button>Chỉnh sửa</button>
                                <button>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NavigationList;
