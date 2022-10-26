import { Tour } from "./TourModel";
import { User } from "./UserModel";
export interface Review {
  _id: string;
  rating: number;
  review: string;
  tour: Tour;
  user: User;
}
