import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { AdminMenu } from '../../components/AdminMenu';
import { selectProducts } from '../../redux/shop/selectors';
import { CategoriesType } from '../../redux/shop/types';
import { useAppDispatch } from '../../redux/store';

export const AddSubcategory = () => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector(selectProducts);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
    },
    mode: 'onChange',
  });

  return (
    <>
      <AdminMenu />
      <div className="add-form">
        <form>
          <input
            {...register('name', { required: 'subcategory problem' })}
            type="text"
            className="form-control is-valid"
            id="name"
            placeholder="Name subcategory"
          />
          <select
            {...register('category', { required: 'category problem' })}
            className="form-control">
            <option value="">Select category</option>
            {categories &&
              categories.map((category: CategoriesType) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <button type="submit" className="btn btn-lg btn-primary btn-block">
            Add subcategory
          </button>
        </form>
      </div>
    </>
  );
};
