import React, { useContext } from 'react';
import { Filter } from '../components/Filter';
import { Pagination } from '../components/Pagination';
import { ShopItem } from '../components/ShopItem';
import { ShopSearch } from '../components/ShopSearch';
import { SortBy } from '../components/SortBy';

import { RootState, useAppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/shop/slice';
import { useSelector } from 'react-redux';

export const Shop: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchProducts());
    setIsLoading(true);
  }, []);

  const { products } = useSelector((state: RootState) => state.products);
  isLoading && console.log(products.items);
  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5">
        <Filter />
        <div className="col-lg-9 col-md-12">
          <div className="row pb-3">
            <div className="col-12 pb-1">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <ShopSearch />
                <SortBy />
              </div>
            </div>
            {products && products.items.map((el: any) => <ShopItem key={el._id} {...el} />)}

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};
