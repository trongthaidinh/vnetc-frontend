import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './DateTime.module.scss';

const cx = classNames.bind(styles);

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    const formattedTime = `${hours}:${formattedMinutes}`;

    return { date: formattedDate, time: formattedTime };
};

function DateTime({ timestamp, readers, showDate, showTime, showReaders }) {
    const date = timestamp ? formatDate(timestamp).date : null;
    const time = timestamp ? formatDate(timestamp).time : null;

    return (
        <div className={cx('info')}>
            <FontAwesomeIcon icon={faCalendarCheck} className={cx('icon')} />
            <span>
                {showTime && time && `${time} `}
                {showDate && date && `| ${date} `}
                {showReaders && `| `}
                {showReaders && (
                    <span className={cx('readers')}>
                        <span className={cx('readers-number')}>{readers}</span>
                        <span> người đã đọc</span>
                    </span>
                )}
            </span>
        </div>
    );
}

DateTime.propTypes = {
    timestamp: PropTypes.number,
    readers: PropTypes.number,
    showDate: PropTypes.bool,
    showTime: PropTypes.bool,
    showReaders: PropTypes.bool,
};

DateTime.defaultProps = {
    showDate: true,
    showTime: true,
    showReaders: true,
};

export default DateTime;
