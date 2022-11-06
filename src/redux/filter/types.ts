export type FiltersType = {
  colors: string[];
  tags: string[];
  sizes: string[];
};

export interface FilterSliseState {
  searchRequest: string;
  filters: FiltersType;
}
