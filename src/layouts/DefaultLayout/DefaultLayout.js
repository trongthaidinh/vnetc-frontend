import React from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import styles from './DefaultLayout.module.scss';
import { BaseRouteProvider } from '~/context/BaseRouteContext';

const cx = classNames.bind(styles);

function DefaultLayout({ children, baseRoute, categoryType }) {
    return (
        <BaseRouteProvider baseRoute={baseRoute}>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <SideBar categoryType={categoryType} />
                    <div className={cx('content')}>{children}</div>
                </div>
                <Footer />
            </div>
        </BaseRouteProvider>
    );
}

export default DefaultLayout;
