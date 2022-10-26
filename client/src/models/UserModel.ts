export interface User {
  _id: string;
  name: string;
  accessToken: string | undefined;
  email: string;
  number: string;
  address: string;
  role: boolean;
  photo: string;
  name_photo: string;
  password: string;
  passwordConfirm?: string;
  passwordChangedAt: Date;
}
