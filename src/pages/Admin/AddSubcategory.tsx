import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import axios from '../../axios';
import { AdminMenu } from '../../components/AdminMenu';
import { selectProducts } from '../../redux/shop/selectors';
import { fetchCategories } from '../../redux/shop/slice';
import { SubCategoriesType } from '../../redux/shop/types';
import { useAppDispatch } from '../../redux/store';

export const AddSubcategory = () => {
  const dispatch = useAppDispatch();
  const { categories, subCategories } = useSelector(selectProducts);

  const [isEdit, setIsEdit] = React.useState(false);
  const [editedSubCat, setEditedSubCat] = React.useState({
    _id: '',
    name: '',
    categoryId: '',
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      categoryId: '',
    },
    mode: 'onChange',
  });

  const clearForm = () => {
    setEditedSubCat({ _id: '', name: '', categoryId: '' });
    reset();
  };

  const onSubmit = async (values: Record<string, string>) => {
    try {
      if (!isEdit) {
        const { data } = await axios.post('/subCategory', values);
        if (data) {
          alert('Subcategory add!');
          dispatch(fetchCategories());
          clearForm();
        }
      } else {
        if (window.confirm('Update SubCategory?')) {
          await axios.patch(`/subCategory/${editedSubCat._id}`, editedSubCat);
          dispatch(fetchCategories());
          clearForm();
          setIsEdit(false);
          alert('Subcategory Updated!');
        }
      }
    } catch (error) {
      console.log(error);
      alert('Subcategory add/update problem!');
    }
  };

  const onClickCancel = () => {
    clearForm();
    setIsEdit(false);
  };

  const onClickEdit = async (id: string) => {
    const [subCategory]: SubCategoriesType[] = subCategories.filter(
      (el: SubCategoriesType) => el._id === id,
    );
    setIsEdit(true);

    if (subCategory.category._id) {
      setEditedSubCat({
        _id: id,
        name: subCategory.name,
        categoryId: subCategory.category._id,
      });
    }

    window.scrollTo(0, 0);
  };

  const onClickDel = async (id: string) => {
    try {
      if (window.confirm('Delete Subcat?')) {
        const { data } = await axios.delete(`/subCategory/${id}`);
        if (data) {
          alert('SubCategory deleted!');
          dispatch(fetchCategories());
        }
      }
    } catch (error) {
      console.log(error);
      alert('SubCategory delete problem!');
    }
  };

  return (
    <>
      <AdminMenu />
      <div className="add-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('name', { required: 'name subcat problem' })}
            type="text"
            value={editedSubCat.name}
            onChange={(event) => setEditedSubCat({ ...editedSubCat, name: event.target.value })}
            className="form-control"
            placeholder="Name category"
          />
          <select
            {...register('categoryId', { required: 'category problem' })}
            value={editedSubCat.categoryId}
            onChange={(event) =>
              setEditedSubCat({ ...editedSubCat, categoryId: event.target.value })
            }
            className="form-control">
            <option value="">Select category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>

          {!isEdit ? (
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Add category
            </button>
          ) : (
            <>
              <button type="submit" className="btn btn-lg btn-primary btn-block">
                Update category
              </button>
              <button onClick={onClickCancel} className="btn btn-lg btn-secondary btn-block">
                Сancel
              </button>
            </>
          )}
        </form>

        <table className="table table-bordered text-center mb-0 mt-4">
          <thead className="bg-secondary text-dark">
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Description</th>
              <th>Edit/Del</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {subCategories &&
              subCategories.map((subCategory: SubCategoriesType, index) => (
                <tr key={subCategory._id}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle" style={{ textAlign: 'left' }}>
                    {subCategory.name}
                  </td>
                  <td className="align-middle" style={{ textAlign: 'justify' }}>
                    {subCategory.category.name}
                  </td>
                  <td className="align-middle">
                    <button
                      onClick={() => {
                        subCategory._id && onClickEdit(subCategory._id);
                      }}
                      title="Edit Subcategory"
                      className="btn btn-sm btn-primary">
                      <i className="fa fa-edit"></i>
                    </button>{' '}
                    <button
                      onClick={() => {
                        subCategory._id && onClickDel(subCategory._id);
                      }}
                      title="Delete Subcategory"
                      className="btn btn-sm btn-primary">
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
