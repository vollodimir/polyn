import React from 'react';
import { useSelector } from 'react-redux';
import { AdminMenu } from '../../components/AdminMenu';
import { Pagination } from '../../components/Pagination';
import { ShopItemProps } from '../../components/ShopItem';
import { fetchProducts, setCurentPage } from '../../redux/shop/slice';
import { RootState, useAppDispatch } from '../../redux/store';

export const AdminPanel = () => {
  const dispatch = useAppDispatch();

  const { products, pagination } = useSelector((state: RootState) => state.products);

  const onChangePage = (page: number) => dispatch(setCurentPage(page));

  React.useEffect(() => {
    dispatch(fetchProducts(pagination.page));
  }, [pagination.page]);

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
                      src={`http://localhost:4444/uploads/${product.imgURL[0]}`}
                      style={{ width: '50px' }}
                    />{' '}
                    {product.title}
                  </td>
                  <td className="align-middle">$ {product.price}</td>
                  <td className="align-middle">{product.sizes.join(', ')}</td>
                  <td className="align-middle">$150</td>
                  <td className="align-middle">
                    <button className="btn btn-sm btn-primary">
                      <i className="fa fa-times"></i>
                    </button>{' '}
                    <button className="btn btn-sm btn-primary">
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
