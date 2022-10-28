export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error', 
}

export type CategoriesType = {
  _id?: string;
  name: string;
  description: string;
};

export type SubCategoriesType = {
  _id?: string;
  name: string;
  category: CategoriesType;
};

export type ShopItemProps = {
  _id?: string;
  title: string;
  description: string;
  text: string;
  categoryId: string;
  category?: CategoriesType;
  subCategoryId: string;
  subCategory?: SubCategoriesType;
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

export type FetchProductsType = {
  products: ShopItemProps[];
  pagination: PaginationType;
};

export type FetchProductsParams = {
  page?: number;
  searchRequest?: string;
};

export type PaginationType = {
  page: number;
  limit: number;
  pages: number;
  allProducts: number;
};

export interface ProductsSliceState {
  products: ShopItemProps[];
  pagination: PaginationType;
  categories: CategoriesType[];
  subCategories: SubCategoriesType[];
  status: Status;
}
