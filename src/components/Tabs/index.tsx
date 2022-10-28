import React from 'react';
import { ShopItemProps } from '../../redux/shop/types';
import styles from './Tabs.module.scss';

export const Tabs: React.FC<ShopItemProps> = ({ text }) => {
  return (
    <>
      <div className={`${styles.tabs}`}>
        <input name="tabs" type="radio" id="tab-1" defaultChecked={true} />
        <label className="nav-item nav-link" htmlFor="tab-1">
          Опис товару
        </label>
        <div className={`tab-pane fade show ${styles.tabs__panel}`}>
          {/* <h4 className="mb-3">Product Description</h4> */}
          <p>{text}</p>
        </div>

        <input name="tabs" type="radio" id="tab-2" />
        <label className="nav-item nav-link" htmlFor="tab-2">
          Tangerine
        </label>
        <div className={`tab-pane fade show  ${styles.tabs__panel}`}>
          <h1>Tangerine</h1>
          <p>
            A clementine (Citrus clementina) is a hybrid between a mandarin orange and a sweet
            orange, so named in 1902. The exterior is a deep orange colour with a smooth, glossy
            appearance. Clementines can be separated into 7 to 14 segments. Similarly to tangerines,
            they tend to be easy to peel.
          </p>
        </div>

        <input name="tabs" type="radio" id="tab-3" />
        <label className="nav-item nav-link" htmlFor="tab-3">
          Clemantine
        </label>
        <div className={`tab-pane fade show active ${styles.tabs__panel}`}>
          <h1>Clemantine</h1>
          <p>
            A clementine (Citrus clementina) is a hybrid between a mandarin orange and a sweet
            orange, so named in 1902. The exterior is a deep orange colour with a smooth, glossy
            appearance. Clementines can be separated into 7 to 14 segments. Similarly to tangerines,
            they tend to be easy to peel.
          </p>
        </div>
      </div>
    </>
  );
};
