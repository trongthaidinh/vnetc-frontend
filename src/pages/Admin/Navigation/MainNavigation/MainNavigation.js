import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getNavigationLinks, deleteNavigationLink } from '~/services/navigationService';
import styles from './MainNavigation.module.scss';
import Title from '~/components/Title';

const NavigationList = () => {
    const [navigations, setNavigations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchNavigations = async () => {
            const data = await getNavigationLinks();
            setNavigations(data);
        };

        fetchNavigations();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this navigation?')) {
            try {
                await deleteNavigationLink(id);
                setNavigations(navigations.filter((nav) => nav._id !== id));
                alert('Navigation deleted successfully!');
            } catch (error) {
                console.error('Error deleting navigation:', error);
                alert('There was an error deleting the navigation.');
            }
        }
    };

    const filteredNavigations = navigations.filter(
        (nav) =>
            nav.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nav.childs.some((child) => child.title.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    return (
        <div className={styles.navigationContainer}>
            <Title className={styles.pageTitle} text="Danh sách Navigation" />
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Navigation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to="/add-navigation" className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Navigation
                </Link>
            </div>
            <div className={styles.navigationList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Loại</th>
                            <th>Navigation Cha</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNavigations.length > 0 ? (
                            filteredNavigations.map((nav) => (
                                <React.Fragment key={nav._id}>
                                    <tr>
                                        <td>{nav.title}</td>
                                        <td>Navigation chính</td>
                                        <td>N/A</td>
                                        <td>
                                            <Link to={`/edit-navigation/${nav._id}`} className={styles.editButton}>
                                                <FontAwesomeIcon icon={faEdit} /> Sửa
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(nav._id)}
                                                className={styles.deleteButton}
                                            >
                                                <FontAwesomeIcon icon={faTrash} /> Xóa
                                            </button>
                                        </td>
                                    </tr>
                                    {nav.childs.map((child) => (
                                        <tr key={child._id} className={styles.childRow}>
                                            <td>{child.title}</td>
                                            <td>Navigation phụ</td>
                                            <td>{nav.title}</td>
                                            <td>
                                                <Link
                                                    to={`/edit-navigation/${child._id}`}
                                                    className={styles.editButton}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} /> Sửa
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(child._id)}
                                                    className={styles.deleteButton}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} /> Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NavigationList;
