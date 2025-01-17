import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '@/lib/axios';
import { Recipe } from '@/types/recipe';

export function useRecipes(category?: string) {
  return useQuery(['recipes', category], async () => {
    const { data } = await api.get<Recipe[]>('/recipes', {
      params: { category },
    });
    return data;
  });
}

export function useRecipe(id: number) {
  return useQuery(['recipe', id], async () => {
    const { data } = await api.get<Recipe>(`/recipes/${id}`);
    return data;
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      recipeId,
      content,
      rating,
    }: {
      recipeId: number;
      content: string;
      rating: number;
    }) => {
      const { data } = await api.post(`/recipes/${recipeId}/comments`, {
        content,
        rating,
      });
      return data;
    },
    {
      onSuccess: (_, { recipeId }) => {
        queryClient.invalidateQueries(['recipe', recipeId]);
      },
    }
  );
}