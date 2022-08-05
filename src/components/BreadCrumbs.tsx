import React from 'react';

export const BreadCrumbs = () => {
  return (
    <div className="container-fluid bg-secondary mb-5">
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: '300px' }}>
        <h1 className="font-weight-semi-bold text-uppercase mb-3">Contact Us</h1>
        <div className="d-inline-flex">
          <p className="m-0">
            <a href="">Home</a>
          </p>
          <p className="m-0 px-2">-</p>
          <p className="m-0">Contact</p>
        </div>
      </div>
    </div>
  );
};
