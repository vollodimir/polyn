import React from 'react';
import axios from '../../axios';
import { useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';

import removeSVG from '../../assets/img/svg/cancel-circle.svg';
import { AdminMenu } from '../../components/AdminMenu';

import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/shop/selectors';
import { CategoriesType, ShopItemProps, SubCategoriesType } from '../../redux/shop/types';
import { API_URL } from '../../config';

const sizesArr = [
  { value: '110/140', label: '110/140' },
  { value: '140/200', label: '140/200' },
  { value: '90/200', label: '90/200' },
  { value: '60/120', label: '60/120' },
];

const defaultFormValue = {
  _id: '',
  title: '',
  description: '',
  text: '',
  categoryId: '',
  subCategoryId: '',
  tags: [''],
  imgURL: [],
  videoURL: '',
  availability: true,
  sizes: [''],
  colors: [''],
  price: 0,
  priceFactor: 0,
  sale: 0,
};

export const AddProduct = () => {
  const { id } = useParams();
  const { categories, products, subCategories } = useSelector(selectProducts);
  const [productImgArr, setProductImgArr] = React.useState<string[]>([]);
  const [catId, setCatId] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(true);

  const [editedProd]: ShopItemProps[] = products.filter(
    (product: ShopItemProps) => id === product._id,
  );

  const [prodEdited, setProdEdited] = React.useState<ShopItemProps>(editedProd || defaultFormValue);

  React.useEffect(() => {
    if (id) {
      setProductImgArr(editedProd.imgURL);
      setCatId(editedProd.categoryId);
    }
  }, []);

  const {
    reset,
    resetField,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: prodEdited,
    mode: 'onChange',
  });

  const onSubmit = async (values: ShopItemProps) => {
    try {
      let productId;
      const { colors, tags } = values;
      values.colors = String(colors).split(',');
      values.tags = String(tags).split(',');
      values.imgURL = productImgArr;

      if (id) {
        if (window.confirm('Update Product?')) {
          await axios.patch(`/product/${prodEdited._id}`, values);
          alert('Product Updated!');
          onClickCancel();
          productId = id;
        }
      } else {
        const { data } = await axios.post('/product', values);
        console.log(data);
        if (data) {
          productId = data._id;
          alert('Product add!');
          reset();
          setProdEdited(defaultFormValue);
          setProductImgArr([]);
        }
      }
      //tut dorobyty
      await axios.post('/upload/move', { imgURL: values.imgURL, productId: productId });
    } catch (error) {
      console.log(error);
      alert('Product add problem!');
    }
  };

  const onChangeFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const files = event.target.files;

      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append('image[]', files[i]);
        }
      }
      const { data } = await axios.post('/upload/array', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProductImgArr(data);
      //spochatku u state? a potim zagruzka
    } catch (error) {
      console.log('yakas imageArr err!', error);
    }
  };

  const onChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCatId(event.target.value);
  };

  const onClickRemoveImg = () => {
    setProductImgArr([]);
    resetField('imgURL');
  };

  const onClickCancel = () => {
    reset();
    setProdEdited(defaultFormValue);
    setIsEdit(false);
  };

  if (!isEdit) {
    return <Navigate to={`/admin`} />;
  }

  return (
    <>
      <AdminMenu />
      <div className="add-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('title', { required: 'title problem' })}
            value={prodEdited.title}
            onChange={(event) => setProdEdited({ ...prodEdited, title: event.target.value })}
            type="text"
            className="form-control is-valid"
            id="title"
            placeholder="Title"
          />
          <div className="add-form__cat">
            <input
              {...register('imgURL')}
              onChange={onChangeFileInput}
              //value={prodEdited.imgURL}
              //onChange={(event) => setProdEdited({ ...prodEdited, title: event.target.value })}
              multiple
              type="file"
              className="form-control-file"
              name="imgURL"
              accept=".jpg, .jpeg, .png, .webp"
            />

            {!!productImgArr.length && (
              <>
                <img
                  onClick={onClickRemoveImg}
                  style={{ height: '60px', margin: '0 5px 10px 0' }}
                  src={removeSVG}
                  title={'Remove image'}
                  alt={'Remove image'}
                />
                {productImgArr.map((img: string, index) => (
                  <img
                    key={img + index}
                    style={{ height: '60px', margin: '0 5px 10px 0' }}
                    src={`${API_URL}/uploads/temp/${img}`}
                    title={img}
                    alt={img}
                  />
                ))}
              </>
            )}
            <label className="form-control">
              <input
                {...register('availability')}
                checked={prodEdited.availability}
                onChange={() =>
                  setProdEdited({ ...prodEdited, availability: !prodEdited.availability })
                }
                type="checkbox"
                name="availability"
                //defaultChecked
              />{' '}
              Available
            </label>

            <select
              {...register('categoryId', { required: 'category problem' })}
              onChange={onChangeCategory}
              className="form-control">
              <option value="">Select category</option>
              {categories &&
                categories.map((category: CategoriesType) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>

            <select
              {...register('subCategoryId', { required: 'subCategory problem' })}
              value={prodEdited.subCategoryId}
              onChange={(event) =>
                setProdEdited({ ...prodEdited, subCategoryId: event.target.value })
              }
              className="form-control">
              <option value="">Select subcategory</option>
              {subCategories &&
                subCategories
                  .filter((el: SubCategoriesType) => el.category._id === catId)
                  .map((subCategory: SubCategoriesType) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
            </select>
          </div>
          <input
            {...register('videoURL')}
            value={prodEdited.videoURL}
            onChange={(event) => setProdEdited({ ...prodEdited, videoURL: event.target.value })}
            type="text"
            className="form-control"
            id="video"
            placeholder="Video URL"
          />
          <input
            {...register('tags', { required: 'tags problem' })}
            type="text"
            className="form-control"
            id="tags"
            placeholder="Tags: ..., ...,"
          />
          <textarea
            {...register('description', { required: 'description problem' })}
            className="form-control"
            id="description"
            rows={3}
            placeholder="Description"></textarea>
          <textarea
            {...register('text', { required: 'text problem' })}
            className="form-control"
            id="text"
            rows={6}
            placeholder="Text"></textarea>
          <input
            {...register('colors', { required: 'file problem' })}
            type="text"
            className="form-control"
            id="colors"
            placeholder="Colors"
          />

          <select
            multiple
            {...register('sizes', { required: 'sizes problem' })}
            className="form-control">
            {sizesArr.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>

          <div className="add-form__price">
            <input
              {...register('price', { required: 'price problem' })}
              type="text"
              className="form-control"
              id="price"
              placeholder="price"
            />
            <input
              {...register('priceFactor', { required: 'priceFactor problem' })}
              type="text"
              className="form-control"
              id="priceFactor"
              placeholder="priceFactor"
            />
            <input
              {...register('sale', { required: 'sale problem' })}
              type="text"
              className="form-control"
              id="sale"
              placeholder="sale"
            />
          </div>
          {!id ? (
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Add product
            </button>
          ) : (
            <>
              <button type="submit" className="btn btn-lg btn-primary btn-block">
                Update product
              </button>
              <button onClick={onClickCancel} className="btn btn-lg btn-secondary btn-block">
                Сancel
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};
