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
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

const Tophead = () => {
    const [hasNewNotification, setHasNewNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchLatestNotifications = async () => {
            try {
                const notificationData = await getNewsPagination(1, 4);
                const currentTime = dayjs();
                const newNotificationsData = notificationData.map((notification) => ({
                    ...notification,
                    isNew: currentTime.diff(dayjs(notification.createdAt), 'day') <= 3,
                }));
                setNotifications(newNotificationsData);
                const hasNew = newNotificationsData.some((notification) => notification.isNew);
                setHasNewNotification(hasNew);

                if (hasNew) {
                    setTimeout(() => {
                        setHasNewNotification(false);
                    }, 3 * 24 * 60 * 60 * 1000);
                }
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
            socket.off('newsAdded');
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

    const notificationMenuItems = notifications.length
        ? notifications.map((notification) => ({
              key: notification._id,
              label: (
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
                                  {notification.isNew && <span className={cx('new-label')}>New</span>}
                              </div>
                              <div className={cx('news-summary')}>{notification.summary}</div>
                          </div>
                      </div>
                  </Link>
              ),
          }))
        : [
              {
                  key: 'no-notifications',
                  label: <span>No new notifications</span>,
                  disabled: true,
              },
          ];

    const notificationMenu = <Menu className={cx('news-menu')} items={notificationMenuItems} />;

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
