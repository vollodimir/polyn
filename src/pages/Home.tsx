import React from 'react';
import { BrandName } from '../components/BrandName';
import { Categories } from '../components/Categories';
import { Featured } from '../components/Featured';
import { HomeProducts } from '../components/HomeProducts';
import { Offer } from '../components/Offer';
import { Subscribe } from '../components/Subscribe';

export const Home = () => {
  return (
    <>
      <Featured />
      <Categories />
      <Offer />
      <HomeProducts />
      <Subscribe />
      <HomeProducts />
      <BrandName />
    </>
  );
};
