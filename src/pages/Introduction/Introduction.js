import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Title from '~/components/Title';
import styles from './Introduction.module.scss';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
// import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Introduction = () => {
    // const { slug } = useParams();
    const [pageContent, setPageContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                // const data = await getPageContent(slug);

                // Replace with actual API call once available
                const data = {
                    _id: '612f3b3c21e3e13e5f85ae04',
                    title: 'Giới Thiệu',
                    content: `<p className={cx('sumary')}>
                    <strong>Công ty Cổ phần Thí nghiệm Cơ điện Việt Nam (VNETC)</strong> là một doanh nghiệp đang nỗ lực
                    phát triển bền vững và hướng đến trở thành một trong những đơn vị lớn mạnh trong lĩnh vực sản xuất
                    thiết bị điện, kiểm định - hiệu chuẩn - thử nghiệm thiết bị điện, công nghệ thông tin và an toàn
                    thông tin trên môi trường mạng.
                </p>
                <ul className={cx('list-info')}>
                    <li>Tên tiếng việt: Công ty Cổ phần Thí nghiệm Cơ điện Việt Nam</li>
                    <li>Tên viết tắt: VN.ETC</li>
                    <li>Người đại diện: Trần Quang Bình</li>
                    <li>Địa chỉ: Số 22 Trần Hữu Dực, tổ 5, Phường Tân Lợi, TP.Buôn Ma Thuột, Tỉnh Đắk Lắk, Việt Nam</li>
                    <li>Điện thoại: 02623977171</li>
                    <li>Email: ngovanlam@gmail.com</li>
                    <li>Loại hình doanh nghiệp: Công ty trách nhiệm hữu hạn 2 thành viên trở lên ngoài NN</li>
                    <li>Số ÐKKD: abc123 222</li>
                    <li>Quản lý bởi: Chi cục Thuế Thành phố Buôn Ma Thuột</li>
                </ul>
                <h4 className={cx('company-history-title')}>
                    Quá trình hình thành và phát triển của Công ty Cổ phần Thí nghiệm Cơ điện Việt Nam:
                </h4>
                <p className={cx('company-history')}>
                    Công ty Cổ phần Thí nghiệm Cơ điện Việt Nam (VNETC) đã trải qua một quá trình hình thành và phát
                    triển đáng chú ý trong lĩnh vực của mình. Từ khi thành lập, VNETC đã tập trung vào việc xây dựng một
                    nền tảng chất lượng và uy tín, và từ đó, công ty đã phát triển và mở rộng hoạt động kinh doanh của
                    mình.
                </p>
                <p className={cx('company-history')}>
                    Quá trình hình thành của VNETC bắt đầu từ việc nhận thức về nhu cầu ngày càng tăng về sản xuất thiết
                    bị điện chất lượng cao và các dịch vụ liên quan. Công ty đã đề ra mục tiêu trở thành một nhà cung
                    cấp hàng đầu trong ngành công nghiệp này, đồng thời cam kết đảm bảo chất lượng và an toàn cho khách
                    hàng và đối tác.
                </p>
                <p className={cx('company-history')}>
                    Với tầm nhìn đó, VNETC đã đầu tư vào việc nâng cao năng lực sản xuất bằng cách tập trung vào nghiên
                    cứu và phát triển công nghệ tiên tiến. Công ty đã thành lập các phòng thí nghiệm hiện đại và trang
                    bị các thiết bị và công cụ tiên tiến nhằm đáp ứng đúng yêu cầu kỹ thuật và tiêu chuẩn chất lượng.
                </p>
                <p className={cx('company-history')}>
                    Ngoài ra, VNETC đã mở rộng phạm vi hoạt động bằng cách đưa công nghệ thông tin và an toàn thông tin
                    trên môi trường mạng vào danh mục dịch vụ. Công ty đã đầu tư vào việc tạo ra các giải pháp công nghệ
                    thông tin tiên tiến và hệ thống bảo mật mạng hiệu quả để đáp ứng nhu cầu ngày càng cao về an ninh
                    thông tin và quản lý dữ liệu.
                </p>
                `,
                };
                setPageContent(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching product detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageContent();
    }); // will be replace in the future
    // }, [slug]);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <article className={cx('wrapper')}>
            <Title text={pageContent.title} />
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        </article>
    );
};

export default Introduction;
