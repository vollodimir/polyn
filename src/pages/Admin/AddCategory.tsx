import React from 'react';
import { AdminMenu } from '../../components/AdminMenu';

export const AddCategory = () => {
  return (
    <>
      <AdminMenu />
      <div className="add-form">
        <form>
          <input
            type="text"
            className="form-control is-valid"
            id="name"
            placeholder="Name category"
          />
          <input type="file" className="form-control-file" id="images" accept=".jpg, .jpeg, .png" />
          <textarea
            className="form-control"
            id="description"
            rows={5}
            placeholder="Description"></textarea>

          <button type="submit" className="btn btn-lg btn-primary btn-block">
            Add category
          </button>
        </form>
      </div>
    </>
  );
};
