import React from 'react';
import images from '~/assets/images/slider';
import Slider from '~/components/Slider';
import Overview from './Overview';
import Products from './Products';
import Services from './Services';

const Home = () => (
    <article>
        <Slider>
            {images.map((image, index) => (
                <img key={index} src={image.imgURL} alt={image.imgAlt} />
            ))}
        </Slider>
        <Overview />
        <Products />
        <Services />
    </article>
);

export default Home;
