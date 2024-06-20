// src/components/Header/Banner.js
import React from 'react';
import cenBanner from '../../assets/images/banner_cen.jpg';

const Banner = () => {
  return (
    <div style={{ height: '100px', background: `url(${cenBanner}) center/cover` }}>
    </div>
  );
};

export default Banner;
