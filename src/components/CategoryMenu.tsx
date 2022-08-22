import React from 'react';

const categories = [
  { key: '0', name: 'Іграшки' },
  { key: '1', name: 'Коврики' },
  { key: '2', name: 'Наволочки на подушки' },
  { key: '3', name: 'Одіялка' },
  { key: '4', name: 'Ортопедичні подушки' },
  { key: '5', name: 'Пелюшки' },
  { key: '6', name: 'Постільні комплекти' },
  { key: '7', name: 'Простині' },
  { key: '8', name: 'Простині на резинці' },
  { key: '9', name: 'Підковдри' },
  { key: '10', name: 'Слюнявчики' },
  { key: '11', name: 'Спальні мішки' },
];

export const CategoryMenu: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  return (
    <div className="col-lg-3 d-none d-lg-block">
      <a
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
        data-toggle="collapse"
        style={{ height: '65px', marginTop: '-1px', padding: '0 30px' }}>
        <h6 className="m-0">Категорії</h6>
        <i className={`fa fa-angle-${isVisible ? 'down' : 'up'} text-dark`}></i>
      </a>
      <nav
        className={`${
          isVisible && 'collapse'
        } position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light`}
        id="navbar-vertical"
        style={{ width: 'calc(100% - 30px)', zIndex: '100' }}>
        <div className="navbar-nav w-100 overflow-hidden" style={{ height: '410px' }}>
          {categories.map((el) => (
            <a key={el.key} href="/" className="nav-item nav-link">
              {el.name}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};
