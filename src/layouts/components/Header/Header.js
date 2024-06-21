import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tophead from './Tophead';
import Navigation from './Navigation';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <Tophead />
            <div className={cx('banner')}></div>
            <Navigation />
        </header>
    );
}

export default Header;
