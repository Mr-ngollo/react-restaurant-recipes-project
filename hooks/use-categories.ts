import { useQuery } from 'react-query';
import { api } from '@/lib/axios';
import { Category } from '@/types/category';

export function useCategories() {
  return useQuery(['categories'], async () => {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  });
}

export function useCategory(name: string) {
  return useQuery(['category', name], async () => {
    const { data } = await api.get<Category>(`/categories/${name}`);
    return data;
  });
}