import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import vietnamFlag from '~/assets/images/vietnam-flag.png';
import ukFlag from '~/assets/images/uk-flag.png';

const cx = classNames.bind(styles);

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('Tiếng Việt');

    const handleLanguageClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('tophead')}>
                <div className={cx('inner')}>
                    <button className={cx('language-button')} onClick={handleLanguageClick}>
                        <img
                            src={language === 'Tiếng Việt' ? vietnamFlag : ukFlag}
                            alt={language}
                            className={cx('flag-icon')}
                        />
                        {language}
                        <FontAwesomeIcon icon={faAngleDown} className={cx('arrow-icon')} />
                    </button>
                    <div className={cx('language-menu', { open: isOpen })}>
                        <button className={cx('close-button')} onClick={() => setIsOpen(false)}>
                            &times;
                        </button>
                        <ul>
                            <li>
                                <button onClick={() => handleLanguageChange('Tiếng Việt')}>
                                    <img src={vietnamFlag} alt="Tiếng Việt" className={cx('flag-icon')} />
                                    Tiếng Việt
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleLanguageChange('English')}>
                                    <img src={ukFlag} alt="English" className={cx('flag-icon')} />
                                    English
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx('banner')}></div>
            <div className={cx('nav')}>
                <div className={cx('inner')}>
                    <ul className={cx('navigation-links')}>
                        <li>
                            <NavLink exact to="/" activeClassName={cx('active-link')}>
                                Trang chủ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/gioi-thieu" activeClassName={cx('active-link')}>
                                Giới Thiệu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tin-tuc" activeClassName={cx('active-link')}>
                                Tin tức
                            </NavLink>
                        </li>
                    </ul>
                    <button className={cx('search-button')}>Tìm kiếm</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
