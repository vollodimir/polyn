import { RootState } from '../store';

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const selectUserData = (state: RootState) => state.auth.data;
