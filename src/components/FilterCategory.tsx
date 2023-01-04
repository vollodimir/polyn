import React from 'react';
import { useSelector } from 'react-redux';
import { setCatID } from '../redux/filter/slice';
import { selectProducts } from '../redux/shop/selectors';
import { useAppDispatch } from '../redux/store';

export const FilterCategory = () => {
  const dispatch = useAppDispatch();
  const { parameters, categories } = useSelector(selectProducts);

  const [activeCategory, setActiveCategory] = React.useState<string[]>([]);

  const onClickCategory = (id: string) => {
    if (!activeCategory.includes(id)) {
      setActiveCategory([...activeCategory, id]);
    } else {
      setActiveCategory(activeCategory.filter((id) => !id));
    }

    console.log(activeCategory);
  };

  const onClickAll = () => {
    if (activeCategory[0]) {
      setActiveCategory([]);
      dispatch(setCatID([]));
    }
  };

  React.useEffect(() => {
    if (parameters.allCatID.length === activeCategory.length && activeCategory[0]) {
      setActiveCategory([]);
    }

    dispatch(setCatID(activeCategory));
  }, [activeCategory]);

  console.log(activeCategory);

  return (
    <div>
      <button
        onClick={() => {
          onClickAll();
        }}
        className={`btn btn-${activeCategory[0] ? '-light border' : 'secondary'}`}>
        {' '}
        # All{' '}
      </button>
      {categories
        .filter(({ _id }) => _id && parameters.allCatID.includes(_id))
        .map((cat) => (
          <button
            key={cat._id}
            onClick={() => {
              cat._id && onClickCategory(cat._id);
            }}
            className={`btn btn-${
              cat._id && activeCategory.includes(cat._id) ? 'secondary' : '-light border'
            }`}>
            # {cat.name}{' '}
          </button>
        ))}
    </div>
  );
};
