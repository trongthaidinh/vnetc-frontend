import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ButtonGroup.module.scss';

const cx = classNames.bind(styles);

const ButtonGroup = ({ buttons }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={cx('button-group')}>
            {buttons.map((button, index) => (
                <button
                    key={index}
                    className={cx('button', { active: activeIndex === index })}
                    onClick={() => handleClick(index)}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

ButtonGroup.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ButtonGroup;
