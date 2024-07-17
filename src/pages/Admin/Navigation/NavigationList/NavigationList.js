import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getNavigationLinks, deleteNavigationLink } from '~/services/navigationService';
import styles from './NavigationList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';

const NavigationList = () => {
    const [navigations, setNavigations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

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

    // Flatten navigations for filtering and pagination
    const allNavigations = navigations.flatMap((nav) => {
        return [
            { ...nav, type: 'Navigation chính', parent: null }, // Primary navigation
            ...nav.childs.map((child) => ({ ...child, type: 'Navigation phụ', parent: nav.title })),
        ];
    });

    const filteredNavigations = allNavigations.filter(
        (nav) =>
            nav.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (nav.parent && nav.parent.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    const totalPages = Math.ceil(filteredNavigations.length / itemsPerPage);
    const indexOfLastNav = currentPage * itemsPerPage;
    const indexOfFirstNav = indexOfLastNav - itemsPerPage;
    const currentNavigations = filteredNavigations.slice(indexOfFirstNav, indexOfLastNav);

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
                <Link to={routes.addNavigation} className={styles.addButton}>
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
                        {currentNavigations.length > 0 ? (
                            currentNavigations.map((nav) => (
                                <React.Fragment key={nav._id}>
                                    <tr>
                                        <td>{nav.title}</td>
                                        <td>{nav.type}</td>
                                        <td>{nav.parent ? nav.parent : ''}</td>
                                        <td>
                                            <Link
                                                to={`/admin/edit-navigation/${nav._id}`}
                                                className={styles.editButton}
                                            >
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

            {/* Items per page selection */}
            <div className={styles.itemsPerPageContainer}>
                <label htmlFor="itemsPerPage">Số mục mỗi trang:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to first page when items per page changes
                    }}
                    className={styles.itemsPerPageSelect}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
                <span>
                    Hiện {indexOfFirstNav + 1} đến {Math.min(indexOfLastNav, filteredNavigations.length)} của{' '}
                    {filteredNavigations.length}
                </span>
                <div className={styles.paginationControls}>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavigationList;
