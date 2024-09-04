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
            <title>Trang Chủ | VNETC </title>
            <meta
                name="description"
                content="VNETC cung cấp sản phẩm, dịch vụ cơ điện chất lượng hàng đầu và tin tức mới nhất ngành điện lực."
            />
            <meta
                name="keywords"
                content="CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM, thí nghiệm điện, kiểm định thiết bị điện, thử nghiệm điện, sản phẩm cơ điện, tin tức ngành điện lực, VNETC"
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
