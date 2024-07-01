import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Slider({ children }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [slideDone, setSlideDone] = useState(true);
    const [timeID, setTimeID] = useState(null);

    const slideNext = useCallback(() => {
        setActiveIndex((val) => (val >= children.length - 1 ? 0 : val + 1));
    }, [children.length]);

    const slidePrev = () => {
        setActiveIndex((val) => (val <= 0 ? children.length - 1 : val - 1));
    };

    useEffect(() => {
        if (slideDone) {
            setSlideDone(false);
            const id = setTimeout(() => {
                slideNext();
                setSlideDone(true);
            }, 5000);
            setTimeID(id);
            return () => clearTimeout(id);
        }
    }, [slideDone, slideNext]);

    const AutoPlayStop = () => {
        if (timeID) {
            clearTimeout(timeID);
            setSlideDone(false);
        }
    };

    const AutoPlayStart = () => {
        if (!slideDone) {
            setSlideDone(true);
        }
    };

    return (
        <div className={cx('container__slider')} onMouseEnter={AutoPlayStop} onMouseLeave={AutoPlayStart}>
            {children.map((item, index) => {
                return (
                    <div
                        className={cx('slider__item', {
                            [`slider__item-active-${index + 1}`]: activeIndex === index,
                        })}
                        key={index}
                    >
                        {item}
                    </div>
                );
            })}

            <div className={cx('container__slider__links')}>
                {children.map((item, index) => (
                    <button
                        key={index}
                        className={cx('container__slider__links-small', {
                            'container__slider__links-small-active': activeIndex === index,
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveIndex(index);
                        }}
                    ></button>
                ))}
            </div>

            <button
                className={cx('slider__btn-next')}
                onClick={(e) => {
                    e.preventDefault();
                    slideNext();
                }}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <button
                className={cx('slider__btn-prev')}
                onClick={(e) => {
                    e.preventDefault();
                    slidePrev();
                }}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        </div>
    );
}

export default Slider;
