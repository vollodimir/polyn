import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { API_URL } from '../../config';
import axios from '../../axios';
import { AdminMenu } from '../../components/AdminMenu';
import { Pagination } from '../../components/Pagination';
import { fetchProducts, setCurentPage } from '../../redux/shop/slice';
import { RootState, useAppDispatch } from '../../redux/store';
import { ShopItemProps } from '../../redux/shop/types';

export const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = React.useState(false);
  const [editedId, setEditedId] = React.useState('');

  const { products, pagination } = useSelector((state: RootState) => state.products);

  const fetchParams = { page: pagination.page };

  const onChangePage = (page: number) => dispatch(setCurentPage(page));

  React.useEffect(() => {
    dispatch(fetchProducts(fetchParams));
  }, [pagination.page]);

  const onClickEdit = async (id: string) => {
    setIsEdit(true);
    setEditedId(id);
  };

  const onClickDel = async (id: string) => {
    try {
      if (window.confirm('Delete cat?')) {
        const { data } = await axios.delete(`/product/${id}`);
        if (data) {
          dispatch(fetchProducts(fetchParams));
          alert('Product deleted!');
        }
      }
    } catch (error) {
      console.log(error);
      alert('Product delete problem!');
    }
  };

  if (isEdit) {
    return <Navigate to={`/admin/add-prod/${editedId}`} />;
  }

  return (
    <>
      <AdminMenu />

      <div className=" table-responsive" style={{ margin: '0 auto', width: '80%' }}>
        <table className="table table-bordered text-center mb-0">
          <thead className="bg-secondary text-dark">
            <tr>
              <th>Products ({pagination.allProducts})</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {products &&
              products.map((product: ShopItemProps) => (
                <tr key={product._id}>
                  <td className="align-middle" style={{ textAlign: 'left' }}>
                    <img
                      src={`${API_URL}/uploads/${product._id}/${product.imgURL[0]}`}
                      style={{ width: '50px' }}
                    />{' '}
                    {product.title}
                  </td>
                  <td className="align-middle">$ {product.price}</td>
                  <td className="align-middle">{product.sizes.join(', ')}</td>
                  <td className="align-middle">{product.categoryId}</td>
                  <td className="align-middle">
                    <button
                      onClick={() => {
                        product._id && onClickEdit(product._id);
                      }}
                      title="Edit Category"
                      className="btn btn-sm btn-primary">
                      <i className="fa fa-edit"></i>
                    </button>{' '}
                    <button
                      onClick={() => {
                        product._id && onClickDel(product._id);
                      }}
                      title="Delete Category"
                      className="btn btn-sm btn-primary">
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <Pagination onChangePage={onChangePage} {...pagination} />
      </div>
    </>
  );
};
