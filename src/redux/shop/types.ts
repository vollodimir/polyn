export type CategoriesType = {
  _id?: string;
  name: string;
  description: string;
};

export type SubCategoriesType = {
  _id?: string;
  name: string;
  category: string;
};
