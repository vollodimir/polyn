import React from 'react';
import { Filter } from '../components/Filter';
import { Pagination } from '../components/Pagination';
import { ShopItem } from '../components/ShopItem';
import { ShopSearch } from '../components/ShopSearch';
import { SortBy } from '../components/SortBy';

export const Shop: React.FC = () => {
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
            <ShopItem />
            <ShopItem />
            <ShopItem />
            <ShopItem />
            <ShopItem />
            <ShopItem />
            <ShopItem />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};
