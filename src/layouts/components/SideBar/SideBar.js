import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import styles from './SideBar.module.scss';
import Menu, { MenuItem } from './Menu';
import { getNavigationLinks } from '~/services/navigationService';

const cx = classNames.bind(styles);

function SideBar() {
    const [navigationData, setNavigationData] = useState([]);

    useEffect(() => {
        async function fetchNavigationData() {
            try {
                // const data = await getNavigationLinks();
                let data = await getNavigationLinks();
                data = [
                    {
                        _id: '6671b495255a57dd268763c3',
                        title: 'Giới thiệu',
                        slug: 'about',
                        childs: [
                            {
                                _id: '6671b530255a57dd268763e0',
                                title: 'Tổng quan',
                                slug: 'introduction',
                                parentNavId: '6671b495255a57dd268763c3',
                            },
                            {
                                _id: '6671b571255a57dd268763e5',
                                title: 'Lịch sử phát triển',
                                slug: 'history',
                                parentNavId: '6671b495255a57dd268763c3',
                            },
                            {
                                _id: '6671b583255a57dd268763ea',
                                title: 'Sơ đồ tổ chức',
                                slug: 'organizational',
                                parentNavId: '6671b495255a57dd268763c3',
                            },
                            {
                                _id: '6671b5b2255a57dd268763ef',
                                title: 'Tầm nhìn - Sứ mệnh - Giá trị',
                                slug: 'vision-mission-values',
                                parentNavId: '6671b495255a57dd268763c3',
                            },
                            {
                                _id: '6671b5df255a57dd268763f4',
                                title: 'Hồ sơ năng lực',
                                slug: 'capacity-profile',
                                parentNavId: '6671b495255a57dd268763c3',
                            },
                            {
                                _id: '6671b5ec255a57dd268763f9',
                                title: 'Mục tiêu chất lượng',
                                slug: 'quality-goals',
                                parentNavId: '6671b495255a57dd268763c3',
                            },
                        ],
                    },
                    {
                        _id: '6671b4b7255a57dd268763c7',
                        title: 'Tin tức',
                        slug: 'news',
                        childs: [
                            {
                                _id: '6671b603255a57dd268763fe',
                                title: 'Tin nghành',
                                slug: 'industry-news',
                                parentNavId: '6671b4b7255a57dd268763c7',
                            },
                            {
                                _id: '6671b61b255a57dd26876403',
                                title: 'Tin kinh tế - xã hội',
                                slug: 'social-economic-news',
                                parentNavId: '6671b4b7255a57dd268763c7',
                            },
                        ],
                    },
                    {
                        _id: '6671b4c0255a57dd268763cb',
                        title: 'Sản phẩm',
                        slug: 'products',
                        childs: [
                            {
                                _id: '6671b636255a57dd26876408',
                                title: 'Máy biến áp lực',
                                slug: 'pressure-transformers',
                                parentNavId: '6671b4c0255a57dd268763cb',
                            },
                            {
                                _id: '6671b640255a57dd2687640d',
                                title: 'Máy phát điện',
                                slug: 'generators',
                                parentNavId: '6671b4c0255a57dd268763cb',
                            },
                            {
                                _id: '6671b65f255a57dd26876412',
                                title: 'Máy điện động',
                                slug: 'electric-machines',
                                parentNavId: '6671b4c0255a57dd268763cb',
                            },
                            {
                                _id: '6671b67a255a57dd26876417',
                                title: 'Máy cắt điện cao áp, hạ áp',
                                slug: 'high-low-voltage-cutting-machines',
                                parentNavId: '6671b4c0255a57dd268763cb',
                            },
                            {
                                _id: '6671b683255a57dd2687641c',
                                title: 'Tụ điện',
                                slug: 'capacitors',
                                parentNavId: '6671b4c0255a57dd268763cb',
                            },
                            {
                                _id: '6671b68d255a57dd26876421',
                                title: 'Kháng điện',
                                slug: 'resistors',
                                parentNavId: '6671b4c0255a57dd268763cb',
                            },
                        ],
                    },
                    {
                        _id: '6671b4ce255a57dd268763cf',
                        title: 'Dịch vụ',
                        slug: 'services',
                        childs: [
                            {
                                _id: '6671b69f255a57dd26876426',
                                title: 'Kiểm định',
                                slug: 'inspection',
                                parentNavId: '6671b4ce255a57dd268763cf',
                            },
                            {
                                _id: '6671b6b0255a57dd2687642b',
                                title: 'Thử nghiệm',
                                slug: 'testing',
                                parentNavId: '6671b4ce255a57dd268763cf',
                            },
                            {
                                _id: '6671b6ba255a57dd26876430',
                                title: 'Hiệu chuẩn',
                                slug: 'calibration',
                                parentNavId: '6671b4ce255a57dd268763cf',
                            },
                        ],
                    },
                    {
                        _id: '6671b4db255a57dd268763d3',
                        title: 'Dự án và năng lực',
                        slug: 'projects',
                        childs: [
                            {
                                _id: '6671b6dd255a57dd26876435',
                                title: 'Dự án đang thực hiện',
                                slug: 'ongoing-projects',
                                parentNavId: '6671b4db255a57dd268763d3',
                            },
                            {
                                _id: '6671b6ed255a57dd2687643a',
                                title: 'Dự án đã thực hiện',
                                slug: 'completed-projects',
                                parentNavId: '6671b4db255a57dd268763d3',
                            },
                            {
                                _id: '6671b6f9255a57dd2687643f',
                                title: 'Dự án đầu tư',
                                slug: 'investment-projects',
                                parentNavId: '6671b4db255a57dd268763d3',
                            },
                            {
                                _id: '6671b70e255a57dd26876444',
                                title: 'Dây chuyền công nghệ',
                                slug: 'technology-lines',
                                parentNavId: '6671b4db255a57dd268763d3',
                            },
                            {
                                _id: '6671b727255a57dd26876449',
                                title: 'Máy móc, thiết bị',
                                slug: 'machinery-equipment',
                                parentNavId: '6671b4db255a57dd268763d3',
                            },
                        ],
                    },
                    {
                        _id: '6671b4e6255a57dd268763d7',
                        title: 'Đội ngũ',
                        slug: 'teams',
                        childs: [
                            {
                                _id: '6671b749255a57dd2687644e',
                                title: 'Ban lãnh đạo',
                                slug: 'leadership-team',
                                parentNavId: '6671b4e6255a57dd268763d7',
                            },
                            {
                                _id: '6671b757255a57dd26876453',
                                title: 'Đội công trình',
                                slug: 'construction-team',
                                parentNavId: '6671b4e6255a57dd268763d7',
                            },
                        ],
                    },
                    {
                        _id: '6671b4ef255a57dd268763db',
                        title: 'Liên hệ',
                        slug: 'contact',
                        childs: [],
                    },
                ];
                setNavigationData(data);
            } catch (error) {
                console.error('Error fetching navigation data:', error);
            }
        }

        fetchNavigationData();
    }, []);

    const renderMenuItems = () => {
        const currentSlug = window.location.pathname.split('/')[1];

        const currentNav = navigationData.find((nav) => nav.slug === currentSlug);

        if (!currentNav) {
            return <MenuItem title="Default Title" to="/default" icon={<FontAwesomeIcon icon={faCircleDot} />} />;
        }

        return currentNav.childs.map((child) => (
            <MenuItem
                key={child.id}
                title={child.title}
                to={`/${currentSlug}/${child.slug}`}
                icon={<FontAwesomeIcon icon={faCircleDot} />}
            />
        ));
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>{renderMenuItems()}</Menu>
        </aside>
    );
}

export default SideBar;
