import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import styles from './SideBar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Tổng quan" to={config.routes.about} icon={<FontAwesomeIcon icon={faCircleDot} />} />
                <MenuItem
                    title="Lịch sử phát triển"
                    to={config.routes.history}
                    icon={<FontAwesomeIcon icon={faCircleDot} />}
                />
                <MenuItem
                    title="Tầm nhìn - Sứ Mệnh - Giá Trị"
                    to={config.routes.vision}
                    icon={<FontAwesomeIcon icon={faCircleDot} />}
                />
                <MenuItem
                    title="Sơ đồ tổ chức"
                    to={config.routes.organizational}
                    icon={<FontAwesomeIcon icon={faCircleDot} />}
                />
                <MenuItem
                    title="Hồ sơ năng lực"
                    to={config.routes.capacityProfile}
                    icon={<FontAwesomeIcon icon={faCircleDot} />}
                />
                <MenuItem
                    title="Mục tiêu chất lượng"
                    to={config.routes.qualityGoals}
                    icon={<FontAwesomeIcon icon={faCircleDot} />}
                />
            </Menu>
        </aside>
    );
}

export default SideBar;
