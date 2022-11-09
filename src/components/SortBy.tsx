import React from 'react';
import { setSort } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';

const sortBy = [
  { name: '', title: 'Default' },
  { name: 'priceUp', title: 'Від дешевих' },
  { name: 'priceDown', title: 'Від дорогих' },
  { name: 'byName', title: 'По імені' },
];

export const SortBy = () => {
  const dispatch = useAppDispatch();

  const onChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch(setSort(value));
  };

  return (
    <div className="dropdown ml-4">
      <select title="Сортування" onChange={onChangeSort} className="form-control">
        {sortBy.map((sort) => (
          <option key={'1' + sort.name} value={sort.name}>
            {' '}
            {!sort.name ? 'По даті' : sort.title}
          </option>
        ))}
      </select>
    </div>
  );
};
