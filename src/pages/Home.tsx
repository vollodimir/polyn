import React from 'react';
import { useAppDispatch } from '../redux/store';

import { BrandName } from '../components/BrandName';
import { Categories } from '../components/Categories';
import { Featured } from '../components/Featured';
import { HomeProducts } from '../components/HomeProducts';
import { Offer } from '../components/Offer';
import { Subscribe } from '../components/Subscribe';

import { fetchPosts } from '../redux/posts/slice';

export const Home = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

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
