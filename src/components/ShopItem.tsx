import React from 'react';
import { Link } from 'react-router-dom';

import defaultProdImg from '../assets/img/defaultProdImg.png';
import { API_URL } from '../config';
import { ShopItemProps } from '../redux/shop/types';

export const ShopItem: React.FC<ShopItemProps> = ({
  _id,
  title,
  description,
  text,
  categoryId,
  subCategoryId,
  tags,
  imgURL,
  videoURL,
  availability,
  sizes,
  colors,
  price,
  priceFactor,
  sale,
}) => {
  return (
    <div className={`col-lg-4 col-md-6 col-sm-12 pb-1 ${!availability && 'not-available'}`}>
      <div className="card product-item border-0 mb-4">
        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <Link to={`/shop/${_id}`}>
            <img
              className="img-fluid w-100"
              src={imgURL.length ? `${API_URL}/uploads/${_id}/${imgURL[0]}` : defaultProdImg}
              alt="title"
            />
          </Link>
        </div>
        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
          <h6 className="text-truncate mb-3"> {title} </h6>
          <div className="d-flex justify-content-center">
            <h6>${price - price * sale}</h6>
            <h6 className="text-muted ml-2">{!!sale && <del>${price}</del>}</h6>
          </div>
          <div style={{ fontSize: '12px', textAlign: 'left', padding: '25px' }}>
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                {' '}
                <span className="input-group-text">Розмір:</span>
              </div>
              <select className="form-control border" disabled={sizes[1] ? false : true}>
                {sizes.map((size, index) => (
                  <option key={index + size} value={index}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">Колір:</span>
              </div>
              <select
                className="form-control"
                disabled={colors[1] ? false : true}
                name="user_profile_color_1">
                {colors.map((color, index) => (
                  <option key={color + index} value={index}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border">
          <Link to={`/shop/${_id}`} className="btn btn-sm text-dark p-0">
            <i className="fas fa-eye text-primary mr-1"></i>Деталі
          </Link>
          <Link to="/" className="btn btn-sm text-dark p-0">
            <i className="fas fa-shopping-cart text-primary mr-1"></i>Купити
          </Link>
        </div>
      </div>
    </div>
  );
};
