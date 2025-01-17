"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Clock,
  Users,
  Star,
  MessageCircle,
  User,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useRecipe, useAddComment } from "@/hooks/use-recipes";
import { Recipe } from "@/types/recipe";

export function RecipeContent({ initialData }: { initialData: Recipe }) {
  const { data: recipe = initialData, isLoading } = useRecipe(initialData.id);
  const { mutate: addComment } = useAddComment();
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce delay-150"></div>
            </div>
        </div>
    );
}

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    addComment({
      recipeId: recipe.id,
      content: newComment,
      rating,
    }, {
      onSuccess: () => {
        setNewComment("");
        setRating(5);
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:text-primary">
          <ChevronLeft className="h-4 w-4" />
          Back to Recipes
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <div className="relative h-[400px]">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 flex items-center gap-2">
                  {recipe.icon}
                  {recipe.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <Link
                    href={`/chefs/${recipe.chef.name.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Avatar>
                      <AvatarImage src={recipe.chef.image} alt={recipe.chef.name} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{recipe.chef.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {recipe.chef.recipes} recipes · {recipe.chef.followers} followers
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{recipe.rating}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-3xl mt-4">{recipe.title}</CardTitle>
                <CardDescription className="text-lg">
                  {recipe.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                    <ol className="space-y-4">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex gap-4">
                          <span className="flex-none bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <p>{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Comments ({recipe.comments.length})
                    </h3>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button onClick={handleAddComment} className="flex-none">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      {recipe.comments.map((comment) => (
                        <Card key={comment.id}>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <Avatar>
                                <AvatarImage
                                  src={comment.user.image}
                                  alt={comment.user.name}
                                />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {comment.user.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(comment.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p>{comment.content}</p>
                            <div className="mt-2 flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{comment.rating}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Chef</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={recipe.chef.image} alt={recipe.chef.name} />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mt-4">{recipe.chef.name}</h3>
                  <p className="text-muted-foreground mt-2">{recipe.chef.bio}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{recipe.chef.recipes}</div>
                    <div className="text-sm text-muted-foreground">Recipes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{recipe.chef.followers}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                </div>
                <Button className="w-full mt-4">Follow Chef</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>More from {recipe.chef.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add more recipes from the same chef here */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}