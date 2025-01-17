export interface Recipe {
  id: number;
  title: string;
  category: string;
  chef: Chef;
  prepTime: string;
  servings: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  icon: React.ReactNode;
  ingredients: string[];
  instructions: string[];
  comments: Comment[];
}

export interface Chef {
  name: string;
  image: string;
  bio: string;
  followers: number;
  recipes: number;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  rating: number;
  date: string;
}

export interface User {
  name: string;
  image: string;
}