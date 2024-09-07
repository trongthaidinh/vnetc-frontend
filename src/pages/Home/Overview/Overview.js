import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Overview.module.scss';
import CardItem from './CardItem';
import Button from '~/components/Button';
import images from '~/assets/images/overview-card';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM</h2>
                    <p className={cx('text')}>
                        VNETC nổ lực phát triển bền vững, an toàn chất lượng và hướng đến trở thành một Doanh nghiệp uy
                        tín phát triển mạnh mẽ trên 5 Lĩnh vực chiến lược là Sản xuất thiết bị điện – Kiểm định – Hiệu
                        Chuẩn – Thử nghiệm thiết bị điện – Quản lý vận hành Đường dây và Trạm biến áp.
                    </p>
                    <p className={cx('text')}>
                        Không ngừng sáng tạo, nâng cao uy tín chất lượng của mình và đảm bảo sự hài lòng và an toàn của
                        Khách hàng và đối tác. Mỗi thành viên của VNETC có cơ hội và điều kiện để phát triển năng lực,
                        được tiếp cận công nghệ trình độ để hoàn thiện bản thân và nâng cao đời sống gia đình góp phần
                        cho cuộc sống tốt đẹp hơn.
                    </p>
                    <Link to={routes.about}>
                        <Button className={cx('button')} primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                            Tìm hiểu thêm
                        </Button>
                    </Link>
                </div>
                <div className={cx('cards')}>
                    {images.map((image, index) => (
                        <CardItem
                            title={image.title}
                            key={index}
                            image={image.imgURL}
                            alt={image.imgAlt}
                            link={image.path}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Overview;
