import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filter/selectors';
import { setFilters } from '../../redux/filter/slice';
import { FiltersType } from '../../redux/filter/types';
import { selectProducts } from '../../redux/shop/selectors';
import { useAppDispatch } from '../../redux/store';
import styles from './Filter.module.scss';

export const Filter = () => {
  //price zrobyty validation
  const dispatch = useAppDispatch();
  const { parameters, subCategories } = useSelector(selectProducts);
  const { filters } = useSelector(selectFilter);
  const filterEmpty = {
    colors: [],
    tags: [],
    sizes: [],
    minPrice: parameters.firstPrice,
    maxPrice: parameters.lastPrice,
  };

  const [filtersReq, setFiltersReq] = React.useState<FiltersType>(filters);

  const onChangeSizes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setFiltersReq({ ...filtersReq, sizes: [...filtersReq.sizes, value] });
    } else {
      setFiltersReq({ ...filtersReq, sizes: filtersReq.sizes.filter((el) => el !== value) });
    }
  };
  const onChangeTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setFiltersReq({ ...filtersReq, tags: [...filtersReq.tags, value] });
    } else {
      setFiltersReq({ ...filtersReq, tags: filtersReq.tags.filter((el) => el !== value) });
    }
  };

  const onChangeColors = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setFiltersReq({ ...filtersReq, colors: [...filtersReq.colors, value] });
    } else {
      setFiltersReq({ ...filtersReq, colors: filtersReq.colors.filter((el) => el !== value) });
    }
  };

  const onChangeMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltersReq({ ...filtersReq, minPrice: +event.target.value });
  };

  const onChangeMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltersReq({ ...filtersReq, maxPrice: +event.target.value });
  };

  const fetchFilters = () => {
    const prices = {
      minPrice: filtersReq.minPrice,
      maxPrice: filtersReq.maxPrice,
    };

    const isErr =
      filtersReq.minPrice >= filtersReq.maxPrice ||
      filtersReq.minPrice >= parameters.lastPrice ||
      filtersReq.maxPrice <= parameters.firstPrice ||
      (!!filtersReq.minPrice && !!filtersReq.maxPrice);

    if (
      (filtersReq.minPrice >= filtersReq.maxPrice && !!filtersReq.maxPrice) ||
      filtersReq.minPrice >= parameters.lastPrice
    ) {
      prices.minPrice = 0;
    }
    if (filtersReq.maxPrice <= parameters.firstPrice) {
      prices.maxPrice = 0;
    }
    console.log(isErr, filtersReq.minPrice, filtersReq.maxPrice);

    dispatch(setFilters(isErr ? { ...filtersReq, ...prices } : filtersReq));
  };

  const clearFilters = () => {
    dispatch(setFilters({ ...filterEmpty, minPrice: 0, maxPrice: 0 }));
    setFiltersReq(filterEmpty);
  };

  const hideBtn =
    filtersReq.colors[0] ||
    filtersReq.sizes[0] ||
    filtersReq.tags[0] ||
    filtersReq.minPrice !== filters.minPrice ||
    filtersReq.maxPrice !== filters.maxPrice ||
    !!filters.maxPrice ||
    !!filters.minPrice;

  return (
    <aside className={`${styles.filter} col-lg-3 col-md-12 border`}>
      <div>
        <details open>
          <summary>Категорії:</summary>
          <div className="filter__list">
            {subCategories.map((subCat) => (
              <label key={subCat._id}>
                <input
                  type="checkbox"
                  //checked={filtersReq.sizes.includes(size)}
                  value={subCat.name}
                  //onChange={onChangeSubCat}
                />{' '}
                {subCat.name}
              </label>
            ))}
          </div>
        </details>
      </div>
      <div>
        <details open>
          <summary>Price:</summary>
          <div className="filter__list">
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                value={filtersReq.minPrice || parameters.firstPrice}
                onChange={onChangeMinPrice}
              />
              <span className="input-group-text">-</span>
              <input
                type="number"
                className="form-control"
                value={filtersReq.maxPrice || parameters.lastPrice}
                onChange={onChangeMaxPrice}
              />
            </div>
          </div>
        </details>
      </div>
      <div>
        <details open>
          <summary>Sizes:</summary>
          <div className="filter__list">
            {parameters.allSizes.map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  checked={filtersReq.sizes.includes(size)}
                  value={size}
                  onChange={onChangeSizes}
                />{' '}
                {size}
              </label>
            ))}
          </div>
        </details>
      </div>

      <div>
        <details open>
          <summary>Colors:</summary>
          <div className="filter__list">
            {parameters.allColors.map(
              (color) =>
                color && (
                  <label key={color}>
                    <input
                      checked={filtersReq.colors.includes(color)}
                      type="checkbox"
                      onChange={onChangeColors}
                      value={color}
                    />{' '}
                    {color}
                  </label>
                ),
            )}
          </div>
        </details>
      </div>

      <div>
        <details open>
          <summary>Tags:</summary>
          <div className="filter__list">
            {parameters.allTags.map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  checked={filtersReq.tags.includes(tag)}
                  onChange={onChangeTags}
                  value={tag}
                />{' '}
                {tag}
              </label>
            ))}
          </div>
        </details>
      </div>
      {hideBtn && (
        <div className="text-center">
          <button onClick={clearFilters} className="btn btn-secondary">
            Очистити
          </button>{' '}
          <button onClick={fetchFilters} className="btn btn-primary">
            Показати
          </button>
        </div>
      )}
    </aside>
  );
};
