"use client";

import {
  ChefHat,
  Clock,
  Search,
  Users,
  Star,
  LogIn,
  Menu,
  Utensils,
  Coffee,
  Soup,
  Salad,
  Pizza,
  MessageCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  // ... other recipes with similar detailed structure
];

const categories = [
  { name: "All", icon: <Menu className="h-5 w-5" />, count: recipes.length },
  { name: "Main Course", icon: <Utensils className="h-5 w-5" />, count: 45 },
  { name: "Appetizers", icon: <Pizza className="h-5 w-5" />, count: 32 },
  { name: "Dessert", icon: <Coffee className="h-5 w-5" />, count: 28 },
  { name: "Soups", icon: <Soup className="h-5 w-5" />, count: 15 },
  { name: "Salads", icon: <Salad className="h-5 w-5" />, count: 20 },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-orange-800" />
              <h1 className="text-2xl font-bold text-orange-800">Restaurant Recipes Site</h1>
            </Link>
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      {categories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/categories/${category.name.toLowerCase().replace(" ", "-")}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {category.icon}
                                  <div className="text-sm font-medium leading-none">
                                    {category.name}
                                  </div>
                                </div>
                                <Badge variant="secondary" className="ml-2">
                                  {category.count}
                                </Badge>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4 flex-1 md:flex-none justify-end">
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ThemeToggle />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Login to Your Account</DialogTitle>
                    <DialogDescription>
                      Sign in to rate recipes and save your favorites.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Login form would go here */}
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <div>
                    <Button type="submit" className="w-full">
                      Sign in
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm text-center text-gray-500">
                      Don't have an account?{" "}
                      <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className="flex items-center gap-2"
            >
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden group">
              <Link href={`/recipes/${recipe.id}`}>
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 flex items-center gap-2">
                    {recipe.icon}
                    {recipe.category}
                  </Badge>
                </div>
              </Link>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/chefs/${recipe.chef.name.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={recipe.chef.image} alt={recipe.chef.name} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{recipe.chef.name}</span>
                  </Link>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
                <Link href={`/recipes/${recipe.id}`}>
                  <CardTitle className="mt-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </CardTitle>
                  <CardDescription>{recipe.description}</CardDescription>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{recipe.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{recipe.comments.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}