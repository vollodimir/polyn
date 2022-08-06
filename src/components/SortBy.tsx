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
          Latest
        </a>
        <a className="dropdown-item" href="#">
          Popularity
        </a>
        <a className="dropdown-item" href="#">
          Best Rating
        </a>
      </div>
    </div>
  );
};
