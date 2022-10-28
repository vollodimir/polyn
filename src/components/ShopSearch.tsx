import React from 'react';
import debounce from 'lodash.debounce';
import { setSearchRequest } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';

export const ShopSearch = () => {
  const dispatch = useAppDispatch();
  const inputSearchRef = React.useRef<HTMLInputElement>(null);
  const [searchRequestLocal, setSearchRequestLocal] = React.useState('');

  const onClickClear = () => {
    inputSearchRef.current?.focus();
    searchDebounce('');
    setSearchRequestLocal('');
  };

  const searchDebounce = React.useCallback(
    debounce((request) => dispatch(setSearchRequest(request)), 1000), //setSearchRequest(request)
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRequestLocal(event.target.value);
    searchDebounce(event.target.value);
  };

  return (
    <form action="">
      <div className="input-group">
        <input
          ref={inputSearchRef}
          value={searchRequestLocal}
          onChange={onChangeInput}
          type="text"
          className="form-control"
          placeholder="Пошук по імені"
        />
        <div className="input-group-append">
          {searchRequestLocal && (
            <span onClick={onClickClear} className="input-group-text bg-transparent text-primary">
              <i className="fa fa-times"></i>
            </span>
          )}
          <span className="input-group-text bg-transparent text-primary">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
    </form>
  );
};
