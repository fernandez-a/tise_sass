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
  updated_at:string;
  price_numeric: number;
  country_id: string,
  photos: Photo[];
}