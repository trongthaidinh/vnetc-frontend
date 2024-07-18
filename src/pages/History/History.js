import classNames from 'classnames/bind';
import React from 'react';
import Title from '~/components/Title';
import styles from './History.module.scss';

const cx = classNames.bind(styles);

const History = () => (
    <article className={cx('wrapper')}>
        <Title text="lịch sử phát triển" />
        <div className={cx('content')}>
            <p>
                Công ty Cổ phần Thí nghiệm Cơ điện Việt Nam tiền thân trước đây là Công ty TNHH Một thành viên Thí
                nghiệm điện Việt Nam là đơn vị chuyên cung cấp dịch vụ sản phẩm về phân tích và tư vấn kỹ thuật chuyên
                môn Kiểm định – Hiệu chuẩn – Thử nghiệm thiết bị điện, và là đơn vị phân phối các thiết bị thí nghiệm
                điện, thiết bị tự động hóa của các hãng uy tín trên thế giới và trong nước... Là một trong những nhà
                tích hợp hệ thống tự động công nghiệp hàng đầu Việt Nam. Định hướng phát triển của công ty hiện đã mở
                rộng sang nhiều ngành nghề lĩnh vực bao gồm:
            </p>
            <ul>
                <li>
                    Cung cấp dịch vụ kiểm định, thử nghiệm và hiệu chuẩn các thiết bị điện, dụng cụ điện hạ thế, trung
                    thế và cao thế.
                </li>
                <li>
                    Cung cấp các thiết bị thí nghiệm điện, đo lường, điều khiển cho các nhà máy điện, các nhà máy công
                    nghiệp, các công ty truyền tải và phân phối điện
                </li>
                <li>
                    Quản lý vận hành hệ thống thiết bị trên lưới điện, Đường dây và trạm biến áp, quản lý vận hành hệ
                    thống năng lượng mặt trời, điện gió…
                </li>
                <li>Cung cấp máy biến áp và các thiết bị khác cho các trạm biến áp cao thế, trung thế và hạ thế</li>
                <li>Cung ứng đào tạo lao động chất lượng cho chuyên ngành điện, điện công nghiệp…</li>
                <li>Quảng cáo và truyền thông</li>
                <li>Dịch vụ tên miền và lưu trữ dữ liệu</li>
                <li>Tư vấn, thiết kế website, thi công phần mềm ứng dụng.</li>
                <li>Tư vấn kỹ thuật thi công xây lắp điện công nghiệp ở cấp điện áp 35kV; 110kV và 220kV.</li>
                <li>
                    Bảo trì, bảo dưỡng và thí nghiệm và quản lý vận hành cho các TBA phụ tải; TBA phân phối và truyền
                    tải điện; bảo dưởng và thí nghiệm định kì hệ thống tự động hóa công nghiệp.
                </li>
            </ul>
            <p>
                Toàn bộ cán bộ nhân viên Công ty Cổ phần Thí nghiệm Cơ điện Việt Nam luôn hướng đến các phương án giải
                quyết tối ưu cho các vấn đề khách hàng đang gặp phải nhằm mang được đến cho khách hàng sự hài lòng cao
                nhất với phương châm hàng đầu vì Chất lượng và sự an toàn. Công ty Cổ phần Thí nghiệm Cơ điện Việt Nam
                luôn mong muốn tạo lập mối quan hệ đặc biệt mang lại những giá trị lâu dài cho khách hàng.
            </p>
            <h3>I. PHƯƠNG CHÂM HOẠT ĐỘNG.</h3>
            <p>
                Ngay từ khi hoạt động chúng tôi với phương châm cống hiến hết mình vì sự hài lòng của khách hàng dựa
                trên chất lượng và độ tin cậy cao qua đó giúp chủ đầu tư, khách hàng yên tâm trong sản xuất, kinh doanh.
            </p>
            <p>
                Chúng tôi luôn làm việc với tinh thần chủ động, sáng tạo, siêng năng và đam mê trong công viêc, cung cấp
                những dịch vụ tốt nhất và đem lại lợi ích tối đa cho chủ đầu , đối tác và khách hàng.
            </p>
            <p>
                Chúng tôi đề cao yếu tố cân bằng trong phương pháp tiếp cận đối với từng dự án đồng thời thấu hiểu sự
                cần thiết của việc nghiên cứu, tính bền vững, hiệu quả dự án, khả năng vận hành, bảo trì của công trình
                cũng như kế hoạch hiện tại và tương lai của chủ đầu tư. Chúng tôi chú trọng những vấn đề này ngay từ
                giai đoạn sơ bộ của dự án và phối hợp chặt chẽ với Chủ đầu tư, các nhà thầu ...để không những làm hài
                lòng Chủ đầu tư và các đơn vị liên quan mà còn đáp ứng yêu cầu về ngân sách và tiến độ để dự án được
                thực hiện theo đúng định hướng đề ra.
            </p>
        </div>
    </article>
);

export default History;
