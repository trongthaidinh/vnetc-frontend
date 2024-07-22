import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPhone } from '@fortawesome/free-solid-svg-icons';
import vietnamFlag from '~/assets/images/vietnam-flag.png';
import ukFlag from '~/assets/images/uk-flag.png';
import classNames from 'classnames/bind';
import styles from './Tophead.module.scss';

const cx = classNames.bind(styles);

const Tophead = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('Tiếng Việt');

    const hotlines = [
        { number: '02623977171', name: '' },
        { number: '0931951140', name: '' },
        { number: '0982064747', name: '' },
    ];

    const handleLanguageClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setIsOpen(false);
    };

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
    );
};

export default Tophead;
