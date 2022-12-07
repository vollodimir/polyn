import { ShopItemProps } from '../shop/types';

export interface CartSliseState {
  userId: string;
  totalPrice: number;
  products: ShopItemProps[];
}
