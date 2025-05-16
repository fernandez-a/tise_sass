import { Filter } from '@/types/filter'; // Assuming you have a Product type defined

export const mapFilter = (item: any): Filter => ({
  filter_id: item.id,
  brand_id: item.brand_id,
  condition: item.condition,
  location: item.location,
  created_at: item.created_at
})
