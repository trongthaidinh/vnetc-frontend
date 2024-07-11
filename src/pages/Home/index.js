import React from 'react';
import Overview from './Overview';
import Products from './Products';
import Services from './Services';
import Projects from './Projects';
import NewsLibrary from './NewsLibrary';
import Banner from './Banner';
import Teams from './Teams';
import Partners from './Partners';

const Home = () => (
    <article>
        <Banner />
        <Overview />
        <Products />
        <Services />
        <Projects />
        <NewsLibrary />
        <Teams />
        {/* <Partners /> */}
    </article>
);

export default Home;
