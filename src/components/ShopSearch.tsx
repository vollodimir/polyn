import React from 'react';
// times
export const ShopSearch = () => {
  return (
    <form action="">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search by name" />
        <div className="input-group-append">
          <span className="input-group-text bg-transparent text-primary">
            <i className="fa fa-times"></i>
          </span>
          <span className="input-group-text bg-transparent text-primary">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
    </form>
  );
};
