export interface USDAFoodItem {
    description: string;
    foodNutrients: {
      nutrientName: string;
      unitName: string;
      value: number;
    }[];
  }
  