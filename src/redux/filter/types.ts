export type FiltersType = {
  colors: string[];
  tags: string[];
  sizes: string[];
  catID?: string[];
  subCatID: string[];
  minPrice: number;
  maxPrice: number;
  sort?: string;
};

export interface FilterSliseState {
  searchRequest: string;
  filters: FiltersType;
}
