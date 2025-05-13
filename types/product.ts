// types/product.ts

export interface Photo {
  url: string;
  type: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  condition: string;
  currency: string;
  price_numeric: number;
  photos: Photo[];
}