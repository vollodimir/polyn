import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { CategoryMenu } from '../components/CategoryMenu';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeaderCarousel } from '../components/HeaderCarousel';
import { MainMenu } from '../components/MainMenu';
import { TopBar } from '../components/TopBar';

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <div className="container-fluid">
        <TopBar />
        <Header />
      </div>

      <div className="container-fluid">
        <div className="row border-top px-xl-5">
          <CategoryMenu />
          <div className="col-lg-9">
            <MainMenu />
            {location.pathname === '/' && <HeaderCarousel />}
          </div>
        </div>
      </div>
      {/* !== '/login' */}
      {location.pathname === '/car' && <BreadCrumbs />}

      <Outlet />

      <Footer />

      {/*    <!-- Back to Top --> */}
      {/* <a href="/" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a> */}
    </>
  );
};

export default MainLayout;
