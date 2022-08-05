import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SliderShopDetail.module.scss';

const imgArr = [
  'http://ostarbeiter.vn.ua/img/2022/04/ustawa-o-pomocy-obywatelom-ukrainy.jpg',
  'http://ostarbeiter.vn.ua/img/2021/01/porady-studentam.jpg',
  'http://ostarbeiter.vn.ua/img/2021/01/polski-mazuri-zymoiu.jpg',
  'http://ostarbeiter.vn.ua/img/2015/03/pln-100.jpg',
  'http://ostarbeiter.vn.ua/img/2021/01/zhyrnyi-chetver.jpg',
  'http://ostarbeiter.vn.ua/img/2021/01/zymovi-shyny-eu.jpg',
  'http://ostarbeiter.vn.ua/img/2020/11/pamyatki-prirodi-pol.jpg',
];

type ArrowProps = {
  onClick?: React.MouseEventHandler;
};

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <a className={`carousel-control-prev ${styles.carouselNextPrevHeight}`} onClick={onClick}>
      <i className="fa fa-2x fa-angle-left text-dark"></i>
    </a>
  );
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <a className={`carousel-control-next ${styles.carouselNextPrevHeight}`} onClick={onClick}>
      <i className="fa fa-2x fa-angle-right text-dark"></i>
    </a>
  );
}

export const SliderShopDetail: React.FC = () => {
  const settings = {
    customPaging: (i: number) => (
      <a>
        <img src={imgArr[i]} />
      </a>
    ),

    dots: true,
    dotsClass: styles.dotImg,
    className: '',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  console.log(styles.root);
  return (
    <Slider {...settings}>
      {imgArr.map((imgURL) => (
        <div className={styles.mainImg}>
          <img src={imgURL} />
        </div>
      ))}
    </Slider>
  );
};
