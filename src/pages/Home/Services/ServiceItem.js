import React from 'react';
import classNames from 'classnames/bind';
import styles from './Services.module.scss';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Service = ({ image, title, link }) => {
    return (
        <div className={cx('service')}>
            <div className={cx('image-container')} style={{ backgroundImage: `url(${image})` }}>
                <div className={cx('overlay')}>
                    <h3 className={cx('title')}>{title}</h3>
                    <Link to={link}>
                        <Button className={cx('button')} primary>
                            Xem thêm
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Service;
