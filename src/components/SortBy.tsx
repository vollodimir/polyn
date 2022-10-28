import React from 'react';

export const SortBy = () => {
  return (
    <div className="dropdown ml-4">
      <button
        className="btn border dropdown-toggle"
        type="button"
        id="triggerId"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        Sort by
      </button>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
        <a className="dropdown-item" href="#">
          Name
        </a>
        <a className="dropdown-item" href="#">
          Price
        </a>
        <a className="dropdown-item" href="#">
          Default
        </a>
      </div>
    </div>
  );
};
