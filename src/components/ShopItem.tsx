import React from 'react';
import { Link } from 'react-router-dom';

type ShopItemProps = {
  _id: string;
  title: string;
  description: string;
  text: string;
  category: string;
  subCategory: string;
  tags: string[];
  imgURL: string[];
  videoURL: string;
  availability: boolean;
  sizes: string[];
  colors: string[];
  price: number;
  priceFactor: number;
  sale: number;
};

export const ShopItem: React.FC<ShopItemProps> = ({
  _id,
  title,
  description,
  text,
  category,
  subCategory,
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
    <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
      <div className="card product-item border-0 mb-4">
        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <img className="img-fluid w-100" src={imgURL[0]} alt="title" />
        </div>
        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
          <h6 className="text-truncate mb-3"> {title} </h6>
          <div className="d-flex justify-content-center">
            <h6>${price}</h6>
            <h6 className="text-muted ml-2">{!!sale && <del>${price - price * sale}</del>}</h6>
          </div>
          <div style={{ fontSize: '12px', textAlign: 'left', paddingLeft: '25px' }}>
            <div>
              Розмір:
              {sizes[0] ? (
                <select>
                  {sizes.map((size, index) => (
                    <option key={index + size} value={index}>
                      {size}
                    </option>
                  ))}
                </select>
              ) : (
                'Один розмір'
              )}
            </div>
            <div style={{ paddingTop: '5px' }}>
              Колір:
              {colors[0] ? (
                <select name="user_profile_color_1">
                  {colors.map((color, index) => (
                    <option key={color + index} value={index}>
                      {color}
                    </option>
                  ))}
                </select>
              ) : (
                'Один розмір'
              )}
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
