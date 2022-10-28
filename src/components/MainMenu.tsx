import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuth } from '../redux/auth/selectors';
import { logout } from '../redux/auth/slice';
import { useAppDispatch } from '../redux/store';

export const MainMenu = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = React.useState(true);
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure to logout?')) {
      dispatch(logout());
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
      <Link to="/" className="text-decoration-none d-block d-lg-none">
        <h1 className="m-0 display-5 font-weight-semi-bold">
          <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Polyn
        </h1>
      </Link>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isVisible && 'collapse'} navbar-collapse justify-content-between`}
        id="navbarCollapse">
        <div className="navbar-nav mr-auto py-0">
          <Link to="/" className="nav-item nav-link">
            Головна
          </Link>
          <Link to="/shop" className="nav-item nav-link active">
            Магазин
          </Link>
          <Link to="/shop/12" className="nav-item nav-link">
            Shop Detail
          </Link>
          <div className="nav-item dropdown">
            <Link to="/" className="nav-link dropdown-toggle" data-toggle="dropdown">
              Pages
            </Link>
            <div className="dropdown-menu rounded-0 m-0">
              <Link to="/cart" className="dropdown-item">
                Shopping Cart
              </Link>
              <Link to="checkout.html" className="dropdown-item">
                Checkout
              </Link>
            </div>
          </div>
          <Link to="contact.html" className="nav-item nav-link">
            Contact
          </Link>
        </div>
        <div className="navbar-nav ml-auto py-0">
          {isAuth ? (
            <>
              <Link to="/admin" title="Account Area" className="nav-item nav-link">
                <i className="fa fa-user text-primary"></i>
              </Link>
              <Link onClick={onClickLogout} to="/" className="nav-item nav-link">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-item nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
