import React from 'react';
import { Helmet } from 'react-helmet';
import Overview from './Overview';
import Products from './Products';
// import Services from './Services';
import Projects from './Projects';
import NewsLibrary from './NewsLibrary';
import Banner from './Banner';
import Teams from './Teams';
import Partners from './Partners';

const Home = () => (
    <article>
        <Helmet>
            <title>CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM</title>
            <meta
                name="description"
                content="CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM (VNETC) là đơn vị cung cấp dịch vụ Kiểm định, Thử nghiệm, Quản lý vận hành, Bảo dưỡng - Sửa chữa thiết bị điện chất lượng hàng đầu."
            />
            <meta
                name="keywords"
                content="CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM, thí nghiệm điện, kiểm định thiết bị điện, thử nghiệm điện, quản lý vận hành, phân tích kỹ thuật, sản phẩm cơ điện, tin tức ngành điện lực, VNETC, vietnametc"
            />
            <meta name="author" content="CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM - VNETC" />
        </Helmet>
        <Banner />
        <Overview />
        <Products />
        {/* <Services /> */}
        <Projects />
        <NewsLibrary />
        <Teams />
        <Partners />
    </article>
);

export default Home;
