import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tophead from './Tophead';
import Navigation from './Navigation';

const cx = classNames.bind(styles);

function Header() {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const topHeight = document.querySelector('.tophead-wrapper')?.offsetHeight || 0;
            const bannerHeight = document.querySelector('.banner')?.offsetHeight || 0;
            const navHeight = document.querySelector('.navigation-wrapper')?.offsetHeight || 0;
            const extraScroll = 100;

            const totalHeight = topHeight + bannerHeight + navHeight + extraScroll;

            if (window.scrollY >= totalHeight) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className="tophead-wrapper">
                <Tophead />
            </div>
            <div className={cx('banner')}></div>
            <div className="navigation-wrapper">
                <Navigation isFixed={isFixed} />
            </div>
        </header>
    );
}

export default Header;
