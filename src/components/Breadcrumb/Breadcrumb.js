import React from 'react';
import styles from './Breadcrumb.module.sass';

const Breadcrumb = ({ items }) => {
    return (
        <div className={styles.breadcrumb}>
            {items.map((item, index) => (
                <span key={index}>
                    {item}
                    {index < items.length - 1 && ' > '}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumb;
