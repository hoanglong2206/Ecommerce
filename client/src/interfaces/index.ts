export interface Product {
  id: string;
  name: string;
  brand: string;
  tags: string[];
  description: string;
  price: number;
  category: string;
  rating: number;
  inStock: boolean;
  size: Size[];
  imageCover: string;
  images: string[];
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
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}

export interface Size {
  name: string;
  color: Color[];
}

export interface Color {
  name: string;
  code: string;
  quantity: number;
}
