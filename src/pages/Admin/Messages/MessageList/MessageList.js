import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getMessages, deleteMessage } from '~/services/contactService';
import styles from './MessageList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getMessages();
            if (data) {
                setMessages(data);
            } else {
                alert('Failed to fetch messages.');
            }
        };

        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteMessage(id);
                setMessages(messages.filter((message) => message._id !== id));
                alert('Message deleted successfully!');
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('There was an error deleting the message.');
            }
        }
    };

    const filteredMessages = messages.filter((message) =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
    const indexOfLastMessage = currentPage * itemsPerPage;
    const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
    const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

    return (
        <div className={styles.messageContainer}>
            <Title className={styles.pageTitle} text="Danh sách Tin nhắn" />
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Tin nhắn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.messageList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Ngày tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMessages.length > 0 ? (
                            currentMessages.map((message) => (
                                <tr key={message._id}>
                                    <td>{message.name}</td>
                                    <td>{message.email}</td>
                                    <td>{message.phone}</td>
                                    <td>{message.title}</td>
                                    <td>{message.content}</td>
                                    <td>{new Date(message.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(message._id)}
                                            className={styles.deleteButton}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Không có dữ liệu</td>
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

            <div className={styles.pagination}>
                <span>
                    Hiện {indexOfFirstMessage + 1} đến {Math.min(indexOfLastMessage, filteredMessages.length)} của{' '}
                    {filteredMessages.length}
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

export default MessageList;
