import React from 'react';

export const Search: React.FC = () => {
  return (
    <div className="col-lg-6 col-6 text-left">
      <form action="">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search for products" />
          <div className="input-group-append">
            <span className="input-group-text bg-transparent text-primary">
              <i className="fa fa-times"></i>
            </span>
          </div>
          <div className="input-group-append">
            <span className="input-group-text bg-transparent text-primary">
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
