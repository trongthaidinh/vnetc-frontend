import classNames from 'classnames/bind';
import React from 'react';
import Title from '~/components/Title';
import styles from './Quality.module.scss';

const cx = classNames.bind(styles);

const Quality = () => (
    <article className={cx('wrapper')}>
        <Title text="Mục Tiêu Chất Lượng" />
        <div className={cx('content')}>
            <div>
                <p>
                    <strong>CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM</strong>
                </p>
                <h3>MỤC TIÊU CHẤT LƯỢNG</h3>
                <p>
                    Căn cứ vào chính sách chất lượng đã đề ra, căn cứ vào tình hình sản xuất kinh doanh trong những năm
                    gần đây và phương hướng phát triển của Công ty trong những năm tới, Công ty phấn đấu thực hiện và
                    hoàn thành mục tiêu hằng năm như sau:
                </p>
                <ol>
                    <li>Đạt doanh thu 10 tỷ đồng;</li>
                    <li>Hạn chế sai hỏng dưới 1,5 % trong quá trình thực hiện công việc;</li>
                    <li>
                        100% đáp ứng đúng tiến độ, đúng số lượng, đảm bảo chất lượng theo yêu cầu và đề nghị của khách
                        hàng;
                    </li>
                    <li>100% hoàn thành kiểm định – hiểu chuẩn – thử nghiệm các công trình được giao và nhận thầu;</li>
                    <li>
                        100% hoàn thành Kiểm tra – Bảo dưỡng thiết bị của TBA và hệ thống điện được giao và nhận thầu;
                    </li>
                    <li>
                        100% hoàn thành công tác Quản lý vận hành Đường dây và Trạm biến áp (QLVH ĐZ&TBA) và các thiết
                        bị trực thuộc hệ thống điện được giao và nhận thầu;
                    </li>
                    <li>100% khiếu nại của khách hàng được giải quyết;</li>
                    <li>100% CBCNV trong Công ty giữ an toàn tuyệt đối khi làm việc.</li>
                </ol>
                <p>
                    Giám đốc Công ty cùng toàn thể cán bộ nhân viên cam kết phấn đấu thực hiện và hoàn thành các chỉ
                    tiêu chất lượng nêu trên.
                </p>
                <p>Đắk Lắk, ngày 01 tháng 06 năm 2024</p>
                <p>
                    CT.HĐQT/TỔNG GIÁM ĐỐC
                    <br />
                    TRẦN QUANG BÌNH
                    <br />
                    (Đã ký)
                </p>
            </div>
        </div>
    </article>
);

export default Quality;
