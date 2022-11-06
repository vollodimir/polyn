import React from 'react';
import { Filter } from '../components/Filter';
import { Pagination } from '../components/Pagination';
import { ShopItem } from '../components/ShopItem';
import { ShopSearch } from '../components/ShopSearch';
import { SortBy } from '../components/SortBy';

import { useAppDispatch } from '../redux/store';
import { fetchProducts, setCurentPage } from '../redux/shop/slice';
import { useSelector } from 'react-redux';
import { Loading } from '../components/Loading';
import { selectProducts } from '../redux/shop/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { ShopItemProps } from '../redux/shop/types';

export const Shop: React.FC = () => {
  const dispatch = useAppDispatch();

  const { products, pagination, status } = useSelector(selectProducts);

  const isLoading = status === 'success';

  const onChangePage = (page: number) => dispatch(setCurentPage(page));

  const { searchRequest, filters } = useSelector(selectFilter);

  React.useEffect(() => {
    dispatch(fetchProducts({ page: pagination.page, searchRequest, ...filters }));
  }, [pagination.page, searchRequest, filters]);

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
            {!isLoading ? (
              <Loading />
            ) : (
              <>
                {products.map((el: ShopItemProps) => (
                  <ShopItem key={el._id} {...el} />
                ))}

                {pagination.allProducts > pagination.limit && (
                  <Pagination onChangePage={onChangePage} {...pagination} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
