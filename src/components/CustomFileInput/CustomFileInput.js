import React from 'react';
import styles from './CustomFileInput.module.scss';

const CustomFileInput = ({ label, onChange, value }) => {
    return (
        <div className={styles.customFileInput}>
            <label className={styles.label}>{label}</label>
            <input type="file" accept="image/*" onChange={onChange} className={styles.input} multiple />
            <div className={styles.fileName}>
                {value.length > 0 ? `${value.length} file(s) selected` : 'No file selected'}
            </div>
            <button
                type="button"
                className={styles.uploadButton}
                onClick={() => document.querySelector(`input[type='file']`).click()}
            >
                Upload Image
            </button>
        </div>
    );
};

export default CustomFileInput;
