import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { BellOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import classNames from 'classnames/bind';
import styles from './Tophead.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { Badge, Dropdown, Menu } from 'antd';
import { getCategoriesByType } from '~/services/categoryService';
import { getNewsPagination } from '~/services/newsService';

const cx = classNames.bind(styles);

const Tophead = () => {
    const [hasNewNotification, setHasNewNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newNotifications, setNewNotifications] = useState({});

    useEffect(() => {
        const fetchLatestNotifications = async () => {
            try {
                const notificationData = await getNewsPagination(1, 4);
                const newNotificationsMap = notificationData.reduce((acc, notification) => {
                    acc[notification._id] = true;
                    return acc;
                }, {});
                setNotifications(notificationData);
                setNewNotifications(newNotificationsMap);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoryData = await getCategoriesByType(2);
                setCategories(categoryData);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        const socket = io(`${process.env.REACT_APP_HOST}`, {
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('newsAdded', (data) => {
            console.log(data);
            setHasNewNotification(true);
            fetchLatestNotifications();
        });

        fetchLatestNotifications();
        fetchCategories();

        return () => {
            socket.off('notification');
            socket.disconnect();
        };
    }, []);

    const hotlines = [
        { number: '02623977171', name: '' },
        { number: '0931951140', name: '' },
        { number: '0982064747', name: '' },
    ];

    const getCategorySlug = (news) => {
        const category = categories.find((cat) => cat._id === news.categoryId);
        return category ? category.slug : '';
    };

    // Filter notifications to show only new ones
    const newNotificationsList = notifications.filter((notification) => newNotifications[notification._id]);

    const notificationMenu = (
        <Menu className={cx('news-menu')}>
            {newNotificationsList.length ? (
                newNotificationsList.map((notification) => (
                    <Menu.Item key={notification._id}>
                        <Link to={`${routes.news}/${getCategorySlug(notification)}/${notification._id}`}>
                            <div className={cx('news-item')}>
                                <img
                                    width={100}
                                    src={notification.images}
                                    alt={notification.title}
                                    className={cx('news-image')}
                                />
                                <div className={cx('news-info')}>
                                    <div className={cx('news-title')}>
                                        {notification.title}
                                        {newNotifications[notification._id] && (
                                            <span className={cx('new-label')}>New</span>
                                        )}
                                    </div>
                                    <div className={cx('news-summary')}>{notification.summary}</div>
                                </div>
                            </div>
                        </Link>
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item disabled>No new notifications</Menu.Item>
            )}
        </Menu>
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('hotline-container')}>
                    <div className={cx('hotline')}>
                        <span className={cx('hotline-label')}>
                            <FontAwesomeIcon icon={faPhone} className={cx('phone-icon')} />
                            Hotline:
                        </span>
                        <div className={cx('hotline-numbers')}>
                            {hotlines.map((hotline, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <span className={cx('separator')}> - </span>}
                                    <a className={cx('hotline-number')} href={`tel:${hotline.number}`}>
                                        {hotline.number} {hotline.name && `(${hotline.name})`}
                                    </a>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
                    <Badge dot={false} offset={[0, 1]} className={cx('notification-badge')}>
                        <div className={cx('notification-icon-wrapper')}>
                            {hasNewNotification && (
                                <>
                                    <BellOutlined className={cx('notification-icon')} />
                                    <span className={cx('new-label')}>New</span>
                                </>
                            )}
                        </div>
                    </Badge>
                </Dropdown>
            </div>
        </div>
    );
};

export default Tophead;
