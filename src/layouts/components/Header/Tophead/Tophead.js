import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { BellOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import classNames from 'classnames/bind';
import styles from './Tophead.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { Badge } from 'antd';

const cx = classNames.bind(styles);

const Tophead = () => {
    const [hasNewNotification, setHasNewNotification] = useState(false);

    useEffect(() => {
        const socket = io(process.env.REACT_APP_HOST);

        socket.on('news', (data) => {
            console.log(data);
            setHasNewNotification(true);
        });

        return () => {
            socket.off('news');
            socket.disconnect();
        };
    }, []);

    const hotlines = [
        { number: '02623977171', name: '' },
        { number: '0931951140', name: '' },
        { number: '0982064747', name: '' },
    ];

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
                <Link to={routes.news}>
                    <Badge offset={[0, 1]} className={cx('notification-badge')}>
                        <BellOutlined className={cx('notification-icon')} />
                        {hasNewNotification && <span className={cx('new-badge')}>NEW</span>}
                    </Badge>
                </Link>
            </div>
        </div>
    );
};

export default Tophead;
