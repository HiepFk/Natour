import { Tour } from "./TourModel";
import { User } from "./UserModel";

export interface Order {
  _id: string;
  tour: Tour;
  user?: User | string;
  price: number;
  createdAt?: Date;
  paid?: boolean;
}
