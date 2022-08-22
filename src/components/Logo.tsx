import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="text-decoration-none">
      <h1 className="m-0 display-5 font-weight-semi-bold">
        <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Polyn
      </h1>
    </Link>
  );
};
