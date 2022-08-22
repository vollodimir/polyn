import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

type PaginationProps = {
  page: number;
  limit: number;
  pages: number;
  allProducts: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  pages,
  allProducts,
  onChangePage,
}) => {
  return (
    <div className="col-12 pb-1">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mb-3">
          {page <= 1 ? (
            <li className="page-item disabled">
              <Link className="page-link" to={'/'} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </Link>
            </li>
          ) : (
            <li className="page-item">
              <Link
                onClick={() => onChangePage(page - 1)}
                className="page-link"
                to={`?page=${page - 1}`}
                aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </Link>
            </li>
          )}

          {[...new Array(pages)].map((_, index) => (
            <li
              key={index + page}
              onClick={() => onChangePage(index + 1)}
              className={`page-item ${index + 1 === +page && 'active'}`}>
              <Link className="page-link" to={`?page=${index + 1}`}>
                {index + 1}
              </Link>
            </li>
          ))}

          {pages > page ? (
            <li onClick={() => onChangePage(+page + 1)} className="page-item">
              <Link className="page-link" to={`?page=${+page + 1}`} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </Link>
            </li>
          ) : (
            <li className="page-item disabled">
              <Link className="page-link " to="/" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
