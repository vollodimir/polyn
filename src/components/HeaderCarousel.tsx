import Slider from 'react-slick';

type ArrowProps = {
  onClick?: React.MouseEventHandler;
};

const sliderArr = [
  {
    id: '0',
    imgURL: '/img/carousel-1.jpg',
    subTitle: '10% Off Your First Order',
    title: '1 Fashionable Dress',
  },
  {
    id: '1',
    imgURL: '/img/carousel-2.jpg',
    subTitle: '10% Off Your First Order',
    title: '2 Fashionable Dress',
  },
  {
    id: '2',
    imgURL: '/img/carousel-1.jpg',
    subTitle: '10% Off Your First Order',
    title: '3 Fashionable Dress',
  },
  {
    id: '3',
    imgURL: '/img/carousel-2.jpg',
    subTitle: '10% Off Your First Order',
    title: '4 Fashionable Dress',
  },
];

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <a onClick={onClick} className="carousel-control-prev" data-slide="prev">
      <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
        <span className="carousel-control-prev-icon mb-n2"></span>
      </div>
    </a>
  );
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <a onClick={onClick} className="carousel-control-next" data-slide="next">
      <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
        <span className="carousel-control-next-icon mb-n2"></span>
      </div>
    </a>
  );
}

export const HeaderCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div id="header-carousel" className="carousel slide" data-ride="carousel">
      <Slider {...settings}>
        {sliderArr &&
          sliderArr.map((el) => (
            <div key={el.id} className="carousel-item active" style={{ height: '410px' }}>
              <img className="img-fluid" src={el.imgURL} alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: '700px' }}>
                  <h4 className="text-light text-uppercase font-weight-medium mb-3">
                    {el.subTitle}
                  </h4>
                  <h3 className="display-4 text-white font-weight-semi-bold mb-4">{el.title}</h3>
                  <a href="/" className="btn btn-light py-2 px-3">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};
