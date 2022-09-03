import React from 'react';
import { Link } from 'react-router-dom';
import { AdminMenu } from '../../components/AdminMenu';

export const AdminPanel = () => {
  return (
    <>
      <AdminMenu />

      <div className=" table-responsive" style={{ margin: '0 auto', width: '80%' }}>
        <table className="table table-bordered text-center mb-0">
          <thead className="bg-secondary text-dark">
            <tr>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            <tr>
              <td className="align-middle">
                <img src="img/product-1.jpg" alt="" style={{ width: '50px' }} /> Colorful Stylish
                Shirt
              </td>
              <td className="align-middle">$150</td>
              <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{ width: '100px' }}>
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-minus">
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-sm bg-secondary text-center"
                    defaultValue={1}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-plus">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </td>
              <td className="align-middle">$150</td>
              <td className="align-middle">
                <button className="btn btn-sm btn-primary">
                  <i className="fa fa-times"></i>
                </button>{' '}
                <button className="btn btn-sm btn-primary">
                  <i className="fa fa-trash-o"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
