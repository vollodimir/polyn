import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { AdminMenu } from '../../components/AdminMenu';
import { selectProducts } from '../../redux/shop/selectors';
import { fetchCategories } from '../../redux/shop/slice';
import { CategoriesType } from '../../redux/shop/types';
import { useAppDispatch } from '../../redux/store';

export const AddCategory = () => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector(selectProducts);

  const [isEdit, setIsEdit] = React.useState(false);
  const [editedCategory, setEditedCategory] = React.useState({
    _id: '',
    name: '',
    description: '',
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: editedCategory.name,
      description: editedCategory.description,
    },
    mode: 'onChange',
  });

  const clearForm = () => {
    setEditedCategory({ _id: '', name: '', description: '' });
    reset();
  };

  const onSubmit = async (values: CategoriesType) => {
    try {
      if (!isEdit) {
        const { data } = await axios.post('/category', values);
        if (data) {
          alert('Category add!');
          dispatch(fetchCategories());
          clearForm();
        }
      } else {
        if (window.confirm('Update Category?')) {
          await axios.patch(`/category/${editedCategory._id}`, editedCategory);
          alert('Category Updated!');
          dispatch(fetchCategories());
          clearForm();
        }
      }
    } catch (error) {
      console.log(error);
      alert('Category add/update problem!');
    }
  };

  const onClickCancel = () => {
    clearForm();
    setIsEdit(false);
  };

  const onClickEditCat = async (id: string) => {
    const [category]: CategoriesType[] = categories.filter((el: CategoriesType) => el._id === id);
    setIsEdit(true);
    setEditedCategory({
      _id: id,
      name: category.name,
      description: category.description,
    });

    window.scrollTo(0, 0);
  };

  const onClickDelCat = async (id: string) => {
    try {
      if (window.confirm('Delete cat?')) {
        const { data } = await axios.delete(`/category/${id}`);
        if (data) {
          alert('Cetegory deleted!');
          dispatch(fetchCategories());
        }
      }
    } catch (error) {
      console.log(error);
      alert('Category delete problem!');
    }
  };

  return (
    <>
      <AdminMenu />
      <div className="add-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('name', { required: 'name cat problem' })}
            type="text"
            value={editedCategory.name}
            onChange={(event) => setEditedCategory({ ...editedCategory, name: event.target.value })}
            className="form-control"
            placeholder="Name category"
          />
          <textarea
            {...register('description', { required: 'description cat problem' })}
            className="form-control"
            value={editedCategory.description}
            onChange={(event) =>
              setEditedCategory({ ...editedCategory, description: event.target.value })
            }
            placeholder="Description category"
            rows={4}></textarea>

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
            {categories &&
              categories.map((category: CategoriesType, index) => (
                <tr key={category._id}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle" style={{ textAlign: 'left' }}>
                    {category.name}
                  </td>
                  <td className="align-middle" style={{ textAlign: 'justify' }}>
                    {category.description}
                  </td>
                  <td className="align-middle">
                    <button
                      onClick={() => {
                        category._id && onClickEditCat(category._id);
                      }}
                      title="Edit Category"
                      className="btn btn-sm btn-primary">
                      <i className="fa fa-edit"></i>
                    </button>{' '}
                    <button
                      onClick={() => {
                        category._id && onClickDelCat(category._id);
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
      </div>
    </>
  );
};
