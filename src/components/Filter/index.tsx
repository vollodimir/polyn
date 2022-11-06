import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filter/selectors';
import { setFilters } from '../../redux/filter/slice';
import { FiltersType } from '../../redux/filter/types';
import { selectProducts } from '../../redux/shop/selectors';
import { useAppDispatch } from '../../redux/store';
import styles from './Filter.module.scss';
//import MultiRangeSlider from './MultiRangeSlider';

export const Filter = () => {
  const dispatch = useAppDispatch();
  const { parameters } = useSelector(selectProducts);
  const { filters } = useSelector(selectFilter);

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

  const fetchFilters = () => {
    dispatch(setFilters(filtersReq));
  };
  const clearFilters = () => {
    const filtetEmpty = {
      colors: [],
      tags: [],
      sizes: [],
    };
    dispatch(setFilters(filtetEmpty));

    setFiltersReq(filtetEmpty);
    //setIsClearInputs(false);
  };

  const hideBtn = filtersReq.colors[0] || filtersReq.sizes[0] || filtersReq.tags[0];

  return (
    <aside className={`${styles.filter} col-lg-3 col-md-12 border`}>
      <div>
        <details open>
          <summary>Price:</summary>
          <div className="filter__list">
            {/* <MultiRangeSlider
              min={0}
              max={1000}
              onChange={
                ({ min, max }: { min: number; max: number }) => {}
                // console.log(`min = ${min}, max = ${max}`)
              }
            /> */}
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
