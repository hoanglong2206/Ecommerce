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
  createdAt: string;
}

export interface Comments {
  id: string;
  comment: string;
  rating: number;
  createdDate: string;
  user: Users;
  likes: number;
}

export interface Users {
  id: string;
  name: string;
  email: string;
  gender: "male" | "female" | "other";
  photo: string;
  role: "admin" | "user" | "guest";
  createdAt: string;
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

export interface Order {
  id: string;
  user: Users;
  products: Product[];
  total: number;
  status: "success" | "pending" | "cancelled" | "failed";
  createdAt: string;
}

export interface Cart {
  id: string;
  user: Users;
  products: Product[];
  total: number;
  createdAt: string;
}
