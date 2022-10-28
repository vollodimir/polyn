import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { HomeProducts } from '../components/HomeProducts';
import { Loading } from '../components/Loading';
import { SliderShopDetail } from '../components/SliderShopDetail';
import { Tabs } from '../components/Tabs';
import { ShopItemProps } from '../redux/shop/types';

export const ShopDetail: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<ShopItemProps>();

  React.useEffect(() => {
    axios
      .get(`/product/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
        alert('Article is not found!');
      });
  }, []);
  // const {
  //   _id,
  //   title,
  //   description,
  //   text,
  //   category,
  //   subCategory,
  //   tags,
  //   imgURL,
  //   videoURL,
  //   availability,
  //   sizes,
  //   colors,
  //   price,
  //   priceFactor,
  //   sale,
  // } = data;

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      {/* <!-- Shop Detail Start --> */}
      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 pb-5">
            <SliderShopDetail {...data} />
          </div>

          <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{data.title}</h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star-half-alt"></small>
                <small className="far fa-star"></small>
              </div>
              <small className="pt-1">(50 Reviews)</small>
            </div>
            <h3 className="font-weight-semi-bold mb-4">
              ${data.price - data.price * data.priceFactor}
            </h3>
            <p className="mb-4">{data.description}</p>
            <div className="d-flex mb-3">
              <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
              <form>
                {data.sizes.map((size, index) => (
                  <div
                    key={size + index}
                    className="custom-control custom-radio custom-control-inline">
                    <input
                      defaultChecked={index === 0 ? true : false}
                      type="radio"
                      className="custom-control-input"
                      id={`size-${index + 1}`}
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor={`size-${index + 1}`}>
                      {size}
                    </label>
                  </div>
                ))}
              </form>
            </div>
            <div className="d-flex mb-4">
              <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
              <form>
                {data.colors.map((color, index) => (
                  <div
                    key={index + color}
                    className="custom-control custom-radio custom-control-inline">
                    <input
                      defaultChecked={index === 0 ? true : false}
                      type="radio"
                      className="custom-control-input"
                      id={`color-${index + 1}`}
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor={`color-${index + 1}`}>
                      {color}
                    </label>
                  </div>
                ))}
              </form>
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-minus">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control bg-secondary text-center"
                  defaultValue="1"
                />
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-plus">
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button className="btn btn-primary px-3">
                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
            </div>
            <div className="d-flex pt-2">
              <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
              <div className="d-inline-flex">
                <a className="text-dark px-2" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <Tabs {...data} />
          </div>
        </div>
      </div>

      <HomeProducts />
    </>
  );
};
