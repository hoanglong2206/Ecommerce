export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  reviews: number;
  rating: number;
  inStock: boolean;
  images: Image[];
  comments: Comments[];
}

export interface Comments {
  id: string;
  comment: string;
  rating: number;
  createdDate: string;
  user: Users;
}

export interface Users {
  name: string;
  email: string;
  image: string;
  role: string;
}

export interface Image {
  color: string;
  colorCode: string;
  image: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
