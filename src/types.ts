export interface Product {
  id: string;
  name: string;
  category: 'habits' | 'chaussures' | 'sacs' | 'lunettes' | 'montres' | 'bijoux' | 'accessoires' | 'casquettes' | 'portefeuilles' | 'autres';
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
