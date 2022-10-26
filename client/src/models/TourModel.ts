import { Review } from "./ReviewModel";

export interface StartLocation {
  description?: string;
  type?: string;
  coordinates?: number[];
  address?: string;
}

export interface Location {
  _id: string;
  description: string;
  type: string;
  coordinates: number[];
  address?: string;
  day?: number;
}
export interface Tour {
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: string[];
  _id: string;
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  startLocation: StartLocation;
  locations: Location[];
  guides: string[];
  reviews?: Review[];
}
