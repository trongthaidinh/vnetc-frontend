import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './TeamModal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TeamModal = ({ visible, onClose, team }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <div className={cx('modal-overlay')}>
            <div className={cx('modal')} ref={modalRef}>
                <button className={cx('modal-close')} onClick={onClose}>
                    &times;
                </button>
                {team && (
                    <div className={cx('team-detail')}>
                        <div className={cx('team-image-container')}>
                            <img src={team.image} alt={team.name} className={cx('team-image')} />
                        </div>
                        <div className={cx('team-info')}>
                            <h2 className={cx('team-name')}>{team.name}</h2>
                            <p className={cx('team-position')}>{team.qualification}</p>
                            {/* <p className={cx('team-seniority')}>Kinh nghiệm: {team.seniority} năm</p>
                            <p className={cx('team-yearOfBirth')}>Năm sinh: {team.yearOfBirth}</p> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

TeamModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    team: PropTypes.object,
};

export default TeamModal;
