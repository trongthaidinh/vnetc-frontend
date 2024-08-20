import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SubMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from '../Menu';

const cx = classNames.bind(styles);

function SubMenu({ subcategories, baseRoute }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={cx('submenu')}>
            <div className={cx('submenu-header')} onClick={handleToggle}>
                <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} />
            </div>
            {isOpen && (
                <div className={cx('submenu-content')}>
                    {subcategories.map((subcategory) => (
                        <MenuItem
                            key={subcategory._id}
                            title={subcategory.name}
                            to={`${baseRoute}/${subcategory.slug}`}
                            icon={<FontAwesomeIcon icon={faCircleDot} />}
                            activeIcon={<FontAwesomeIcon icon={faCircleDot} />}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SubMenu;
