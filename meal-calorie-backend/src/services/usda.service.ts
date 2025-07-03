import axios from 'axios';

const USDA_API_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

export const getCaloriesFromUSDA = async (dish: string): Promise<number | null> => {
  const res = await axios.get(USDA_API_URL, {
    params: {
      query: dish,
      api_key: process.env.USDA_API_KEY,
      pageSize: 1,
    },
  });

  const foods = res.data.foods;
  if (!foods || foods.length === 0) return null;

  const nutrients = foods[0].foodNutrients;
  const energy = nutrients.find((n: any) => n.nutrientName === 'Energy' && n.unitName === 'KCAL');

  return energy ? energy.value : null;
};
