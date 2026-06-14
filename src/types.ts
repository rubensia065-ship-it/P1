export interface Product {
  id: string;
  name: string;
  category: 'baskets' | 'crocs' | 'sandales' | 'accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tag?: string;
  description: string;
  ingredientsOrDetails: string[];
  usageTips: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Story {
  id: string;
  title: string;
  coverImage: string;
  slides: {
    title: string;
    description: string;
    image: string;
  }[];
}
