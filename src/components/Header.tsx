import React from 'react';
import { Logo } from './Logo';
import { Search } from './Search';

export const Header: React.FC = () => {
  return (
    <>
      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <Logo />
        </div>

        <Search />

        <div className="col-lg-3 col-6 text-right">
          <a href="/" className="btn border">
            <i className="fas fa-heart text-primary"></i>
            <span className="badge">0</span>
          </a>{' '}
          <a href="/cart" className="btn border">
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="badge">0</span>
          </a>
        </div>
      </div>
    </>
  );
};
