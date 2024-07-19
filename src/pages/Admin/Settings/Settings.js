import React, { useEffect, useState } from 'react';
import { getConfiguration, updateConfiguration } from '~/services/configurationService';
import styles from './Settings.module.scss';
import Title from '~/components/Title';

const Settings = () => {
    const [settings, setSettings] = useState({
        name: '',
        homepage_slider: [],
        contact_email: '',
        phone_number: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await getConfiguration();
            if (data) {
                const parsedSlider = JSON.parse(data.homepage_slider);
                setSettings({
                    ...data,
                    homepage_slider: parsedSlider,
                });
            } else {
                setError('Failed to fetch settings.');
            }
            setLoading(false);
        };

        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleSliderChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSlider = settings.homepage_slider.map((slide, i) =>
            i === index ? { ...slide, [name]: value } : slide,
        );
        setSettings((prevSettings) => ({
            ...prevSettings,
            homepage_slider: updatedSlider,
        }));
    };

    const handleAddSlide = () => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            homepage_slider: [...prevSettings.homepage_slider, { title: '', image_url: '', position: '' }],
        }));
    };

    const handleRemoveSlide = (index) => {
        const updatedSlider = settings.homepage_slider.filter((_, i) => i !== index);
        setSettings((prevSettings) => ({
            ...prevSettings,
            homepage_slider: updatedSlider,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { homepage_slider, ...restSettings } = settings;
            const flattenedSlider = homepage_slider.reduce((acc, slide, index) => {
                acc[`title_${index}`] = slide.title;
                acc[`image_${index}`] = slide.image_url;
                acc[`position_${index}`] = slide.position;
                return acc;
            }, {});

            const updatedSettings = {
                ...restSettings,
                ...flattenedSlider,
            };

            await updateConfiguration(updatedSettings);
            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('There was an error updating the settings.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.settingsContainer}>
            <Title className={styles.pageTitle} text="Cài đặt chung" />
            <form onSubmit={handleSubmit} className={styles.settingsForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Tên công ty</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={settings.name}
                        onChange={handleChange}
                        className={styles.formControl}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Slider Trang chủ</label>
                    {settings.homepage_slider.map((slide, index) => (
                        <div key={index} className={styles.slideItem}>
                            <div className={styles.formGroup}>
                                <label htmlFor={`title-${index}`}>Tiêu đề</label>
                                <input
                                    type="text"
                                    id={`title-${index}`}
                                    name="title"
                                    value={slide.title}
                                    onChange={(e) => handleSliderChange(index, e)}
                                    className={styles.formControl}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor={`image_url-${index}`}>URL hình ảnh</label>
                                <input
                                    type="text"
                                    id={`image_url-${index}`}
                                    name="image_url"
                                    value={slide.image_url}
                                    onChange={(e) => handleSliderChange(index, e)}
                                    className={styles.formControl}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor={`position-${index}`}>Vị trí</label>
                                <input
                                    type="text"
                                    id={`position-${index}`}
                                    name="position"
                                    value={slide.position}
                                    onChange={(e) => handleSliderChange(index, e)}
                                    className={styles.formControl}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => handleRemoveSlide(index)}
                                className={styles.removeButton}
                            >
                                Xóa slide
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddSlide} className={styles.addButton}>
                        Thêm slide
                    </button>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="contact_email">Email liên hệ</label>
                    <input
                        type="email"
                        id="contact_email"
                        name="contact_email"
                        value={settings.contact_email}
                        onChange={handleChange}
                        className={styles.formControl}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone_number">Số điện thoại</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={settings.phone_number}
                        onChange={handleChange}
                        className={styles.formControl}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
};

export default Settings;