import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getNavigationLinks, deleteNavigationLink } from '~/services/navigationService';
import styles from './NavigationList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';

const NavigationList = () => {
    const [navigations, setNavigations] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const fetchNavigations = async () => {
        try {
            const data = await getNavigationLinks();
            setNavigations(data);
        } catch (error) {
            console.error('Error fetching navigation links:', error);
        }
    };

    useEffect(() => {
        fetchNavigations();
    }, []);

    const handleDelete = async (type, id) => {
        if (window.confirm('Are you sure you want to delete this navigation?')) {
            try {
                await deleteNavigationLink(type, id);
                await fetchNavigations();
                setNotification({ message: 'Navigation đã xóa thành công', type: 'success' });
            } catch (error) {
                console.error('Error deleting navigation:', error);
                setNotification({ message: 'Xảy ra lỗi khi xóa Navigation', type: 'error' });
            }
        }
    };

    const flattenNavigations = (navs) => {
        const result = [];

        const processNav = (nav, parent = null) => {
            if (!nav) return;
            if (nav.title) {
                result.push({
                    ...nav,
                    type: parent ? 'Navigation phụ' : 'Navigation chính',
                    parent: parent ? parent.title : null,
                });
            }
            if (nav.childs) {
                nav.childs.forEach((child) => {
                    if (child.child) {
                        child.child.forEach((subChild) => processNav(subChild, child));
                    }
                    return processNav(child, nav);
                });
            }
        };

        navs.forEach((nav) => processNav(nav));
        return result;
    };

    const allNavigations = flattenNavigations(navigations);

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
                                                onClick={() =>
                                                    handleDelete(nav.type === 'Navigation chính' ? 2 : 1, nav._id)
                                                }
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

            <div className={styles.itemsPerPageContainer}>
                <label htmlFor="itemsPerPage">Số mục mỗi trang:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className={styles.itemsPerPageSelect}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

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
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
        </div>
    );
};

export default NavigationList;
