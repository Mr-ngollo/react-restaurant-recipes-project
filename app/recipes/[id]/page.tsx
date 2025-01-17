import { Recipe } from "@/types/recipe";
import { RecipeContent } from "./recipe-content";
import { Utensils } from "lucide-react";

// Mock data - in a real app, this would be fetched from your API
const recipes = [
  {
    id: 1,
    title: "Grilled Mediterranean Salmon",
    category: "Main Course",
    chef: {
      name: "Chef Maria Santos",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
      bio: "Award-winning chef specializing in Mediterranean cuisine",
      followers: 12500,
      recipes: 89,
    },
    prepTime: "25 mins",
    servings: 4,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    description: "Fresh salmon fillet with Mediterranean herbs and lemon",
    rating: 4.8,
    reviews: 124,
    icon: <Utensils className="h-5 w-5" />,
    ingredients: [
      "4 salmon fillets",
      "2 lemons",
      "4 tbsp olive oil",
      "Fresh herbs (rosemary, thyme)",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat grill to medium-high heat",
      "Season salmon with olive oil, herbs, salt, and pepper",
      "Grill for 4-5 minutes per side",
      "Squeeze fresh lemon juice before serving",
    ],
    comments: [
      {
        id: 1,
        user: {
          name: "Sarah Johnson",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        },
        content: "Absolutely delicious! The herbs really make this dish special.",
        rating: 5,
        date: "2024-03-20",
      },
      {
        id: 2,
        user: {
          name: "Mike Chen",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        },
        content: "Perfect weeknight dinner. Easy to follow instructions.",
        rating: 4,
        date: "2024-03-19",
      },
    ],
  },
];

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  return recipes.map((recipe) => ({
    id: recipe.id.toString(),
  }));
}

// Get recipe data - in a real app, this would fetch from your API
function getRecipe(id: string) {
  return recipes.find((r) => r.id === parseInt(id));
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = getRecipe(params.id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return <RecipeContent initialData={recipe} />;
}