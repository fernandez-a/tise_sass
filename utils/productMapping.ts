import { Product } from '@/types/product'; // Assuming you have a Product type defined

export const mapProduct = (item: any): Product => ({
  id: item.product_id,
  title: item.title,
  brand: item.brand,
  condition: item.condition,
  currency: item.currency,
  price_numeric: item.price_numeric,
  photos: item.photos.map((photo: any) => ({
    url: photo.url,
    type: photo.type,
  })),
});