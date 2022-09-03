export type LoginParams = {
  email: string;
  password: string;
};
export type RegisterParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserData = {
  email: string;
  firstName: string;
  isManager?: boolean;
  lastName: string;
  _id: string;
  userData: string;
};

export interface AuthSliceState {
  data: UserData | null;
  status: string;
}
