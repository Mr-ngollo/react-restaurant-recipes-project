"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  User,
  Star,
  MessageCircle,
  MapPin,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// In a real app, this would be fetched from an API
const getChef = (slug: string) => {
  const recipe = recipes.find(
    (r) => r.chef.name.toLowerCase().replace(" ", "-") === slug
  );
  return recipe?.chef;
};

export default function ChefPage() {
  const params = useParams();
  const chef = getChef(params.slug as string);

  if (!chef) {
    return <div>Chef not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:text-primary">
          <ChevronLeft className="h-4 w-4" />
          Back to Recipes
        </Link>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={chef.image} alt={chef.name} />
                    <AvatarFallback>
                      <User className="h-16 w-16" />
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold mt-4">{chef.name}</h1>
                  <p className="text-muted-foreground mt-2">{chef.bio}</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-2xl font-bold">{chef.recipes}</div>
                      <div className="text-sm text-muted-foreground">Recipes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{chef.followers}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                  </div>
                  <Button className="w-full mt-6">Follow Chef</Button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>New York, USA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Master Chef</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Joined 2020</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="recipes">
              <TabsList className="w-full">
                <TabsTrigger value="recipes" className="flex-1">
                  Recipes
                </TabsTrigger>
                <TabsTrigger value="about" className="flex-1">
                  About
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="recipes" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {recipes
                    .filter((r) => r.chef.name === chef.name)
                    .map((recipe) => (
                      <Card key={recipe.id} className="overflow-hidden group">
                        <Link href={`/recipes/${recipe.id}`}>
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <CardHeader>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {recipe.title}
                            </CardTitle>
                            <CardDescription>{recipe.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{recipe.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{recipe.comments.length} reviews</span>
                              </div>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About {chef.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        {chef.bio} With over 15 years of culinary experience,
                        specializing in Mediterranean and fusion cuisine.
                      </p>
                      <h3 className="text-lg font-semibold">Specialties</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Mediterranean Cuisine</li>
                        <li>Seafood Specialties</li>
                        <li>Farm-to-Table Cooking</li>
                        <li>Fusion Dishes</li>
                      </ul>
                      <h3 className="text-lg font-semibold">Awards</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Best Chef Award 2023</li>
                        <li>Culinary Excellence Award</li>
                        <li>Innovation in Cooking 2022</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="space-y-6">
                  {recipes
                    .filter((r) => r.chef.name === chef.name)
                    .flatMap((recipe) =>
                      recipe.comments.map((comment) => (
                        <Card key={comment.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
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
                              <Link
                                href={`/recipes/${recipe.id}`}
                                className="text-sm text-muted-foreground hover:text-primary"
                              >
                                {recipe.title}
                              </Link>
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
                      ))
                    )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}