import classNames from 'classnames/bind';
import SideBar from '../components/Admin/SideBar';
import styles from './AdminLayout.module.scss';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default AdminLayout;
