import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Pencil, X } from 'lucide-react';
import { Recipe } from '@/data/foodData';
import NutritionBadge from './NutritionBadge';

interface MealPlanCardProps {
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  recipe: Recipe | null;
  onRemove?: () => void;
  onEdit?: () => void;
  compact?: boolean;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({ 
  date, 
  mealType, 
  recipe,
  onRemove,
  onEdit,
  compact = false
}) => {
  const formatMealType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (!recipe) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{formatMealType(mealType)}</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4 text-sm">No meal planned</p>
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEdit}
              className="gap-1 text-xs h-7"
            >
              <Pencil className="h-3 w-3" /> Add Meal
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-1 pt-3">
          <CardTitle className="text-xs font-medium flex justify-between items-center">
            {formatMealType(mealType)}
            {onRemove && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5" 
                onClick={onRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-3 px-3">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-xs truncate">{recipe.name}</h4>
              <div className="flex flex-wrap gap-1 mt-0.5">
                <NutritionBadge type="calories" value={recipe.nutrition.calories} className="text-[9px] py-0.5 px-1.5" />
              </div>
            </div>
            {onEdit && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 ml-auto flex-shrink-0" 
                onClick={onEdit}
              >
                <Pencil className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          {formatMealType(mealType)}
          {onRemove && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative h-32 overflow-hidden rounded-md mb-2">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-medium text-sm mb-1">{recipe.name}</h4>
        <div className="flex flex-wrap gap-1 mb-2">
          <NutritionBadge type="calories" value={recipe.nutrition.calories} className="text-[10px]" />
          <NutritionBadge type="protein" value={recipe.nutrition.protein} className="text-[10px]" />
        </div>
        <Link to={`/recipe/${recipe.id}`} className="w-full">
          <Button 
            variant="outline" 
            size="sm"
            className="w-full text-xs h-7"
          >
            View Recipe
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MealPlanCard;
