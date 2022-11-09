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
  parameters: PrametersType;
};

export type FetchProductsParams = {
  page?: number;
  searchRequest?: string;
  colors?: string[];
  tags?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
};

export type PaginationType = {
  page: number;
  limit: number;
  pages: number;
  allProducts: number;
};
export type PrametersType = {
  allColors: string[];
  allTags: string[];
  allSizes: string[];
  firstPrice: number;
  lastPrice: number;
};

export interface ProductsSliceState {
  products: ShopItemProps[];
  pagination: PaginationType;
  parameters: PrametersType;
  categories: CategoriesType[];
  subCategories: SubCategoriesType[];
  status: Status;
}
