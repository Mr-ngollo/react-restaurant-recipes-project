import { useQuery } from 'react-query';
import { api } from '@/lib/axios';
import { Chef } from '@/types/recipe';

export function useChef(name: string) {
  return useQuery(['chef', name], async () => {
    const { data } = await api.get<Chef>(`/chefs/${name}`);
    return data;
  });
}

export function useChefRecipes(name: string) {
  return useQuery(['chef-recipes', name], async () => {
    const { data } = await api.get<Recipe[]>(`/chefs/${name}/recipes`);
    return data;
  });
}