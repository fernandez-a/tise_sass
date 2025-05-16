'use client';

import FilterList from '@/components/filters/filter-list-card';
import { useUser } from '@/context/UserContext';
import { Toaster } from 'sonner';

export default function MyFilterPage({ params }: { params: { username: string } }) {
  const user = useUser();

  return (
    <div>
      <Toaster />
      <FilterList />
    </div>
  );
}