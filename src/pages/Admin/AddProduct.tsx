import React from 'react';
import axios from '../../axios';
import { useForm } from 'react-hook-form';

import removeSVG from '../../assets/img/svg/cancel-circle.svg';
import { AdminMenu } from '../../components/AdminMenu';
import { ShopItemProps } from '../../components/ShopItem';
import { fetchProductAdd } from '../../redux/product/slise';
import { useAppDispatch } from '../../redux/store';

const sizesArr = [
  { value: '110/140', label: '110/140' },
  { value: '140/200', label: '140/200' },
  { value: '90/200', label: '90/200' },
  { value: '60/120', label: '60/120' },
];

export const AddProduct = () => {
  const dispatch = useAppDispatch();
  const [productImgArr, setProductImgArr] = React.useState([]);

  const {
    reset,
    resetField,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      text: '',
      categoryId: '62f6b0bd0bb299970a10107f',
      subCategoryId: '62f6b0f50bb299970a101083',
      tags: [''],
      imgURL: [''],
      videoURL: '',
      availability: true,
      sizes: [''],
      colors: [''],
      price: 0,
      priceFactor: 0,
      sale: 0,
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: ShopItemProps) => {
    try {
      ///zrobyty bez slice
      const { colors, tags } = values;
      values.colors = String(colors).split(',');
      values.tags = String(tags).split(',');
      values.imgURL = productImgArr;
      const productData = await dispatch(fetchProductAdd(values));

      if (productData.meta.requestStatus === 'fulfilled') {
        alert('Product add!');
        reset();
        setProductImgArr([]);
      }

      if (productData.meta.requestStatus === 'rejected') {
        alert('Product add problem!');
      }
    } catch (error) {
      console.log(error);
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

  const onClickRemoveImg = () => {
    setProductImgArr([]);
    resetField('imgURL');
  };

  return (
    <>
      <AdminMenu />
      <div className="add-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('title', { required: 'title problem' })}
            type="text"
            className="form-control is-valid"
            id="title"
            placeholder="Title"
          />
          <div className="add-form__cat">
            <input
              {...register('imgURL')}
              onChange={onChangeFileInput}
              multiple
              type="file"
              className="form-control-file"
              name="imgURL"
              accept=".jpg, .jpeg, .png"
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
                {productImgArr.map((img: string) => (
                  <img
                    key={img}
                    style={{ height: '60px', margin: '0 5px 10px 0' }}
                    src={`http://localhost:4444/uploads/${img}`}
                    title={img}
                    alt={img}
                  />
                ))}
              </>
            )}
            <label className="form-control">
              <input
                {...register('availability', { required: 'availability problem' })}
                type="checkbox"
                name="availability"
                defaultChecked
              />{' '}
              Available
            </label>

            <select
              {...register('categoryId', { required: 'category problem' })}
              className="form-control">
              <option value="62f6b0bd0bb299970a10107f">Nazva Category</option>
              <option value="kod_category2">Nazva Category2</option>
              <option value="kod_category3">Nazva Category3</option>
            </select>

            <select
              {...register('subCategoryId', { required: 'category problem' })}
              className="form-control">
              <option value="62f6b0f50bb299970a101083">Nazva subcategory</option>
              <option value="kod_subcategory2">Nazva subcategory2</option>
              <option value="kod_subcategory3">Nazva subcategory3</option>
            </select>
          </div>
          <input
            {...register('videoURL', { required: 'videoURL problem' })}
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
          <button type="submit" className="btn btn-lg btn-primary btn-block">
            Add product
          </button>
        </form>
      </div>
    </>
  );
};
