import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Overview.module.scss';
import CardItem from './CardItem';
import Button from '~/components/Button';
import images from '~/assets/images/overview-card';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM</h2>
                    <p className={cx('text')}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius ipsum dolor sit...Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit, sed do eius ipsum dolor sit...Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit, sed do eius ipsum dolor sit...Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eius ipsum dolor sit...Lorem ipsum dolor sit.
                    </p>
                    <p className={cx('text')}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius ipsum dolor sit...Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit, sed do eius ipsum dolor sit...Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit, sed do eius ipsum dolor sit...Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eius ipsum dolor sit...Lorem ipsum dolor sit.
                    </p>
                    <Link to={'/about'}>
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
