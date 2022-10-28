import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { selectUserData } from '../redux/auth/selectors';

export const AdminMenu = () => {
  const userData = useSelector(selectUserData);

  if (!userData?.isManager) {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-menu">
      Manager: {String(userData?.isManager)}
      <Link to="/admin" className="btn btn-primary active" aria-current="page">
        List products
      </Link>
      <Link to="/admin/add-prod" className="btn btn-primary">
        Add product
      </Link>
      <Link to="/admin/add-cat" className="btn btn-primary">
        Add category
      </Link>
      <Link to="/admin/add-subcat" className="btn btn-primary">
        Add subcategory
      </Link>
    </div>
  );
};
