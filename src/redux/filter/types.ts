export type FiltersType = {
  colors: string[];
  tags: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
};

export interface FilterSliseState {
  searchRequest: string;
  filters: FiltersType;
}
