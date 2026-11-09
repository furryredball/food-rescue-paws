import raw from '../content/foods.json'
import type { FoodCard } from '../types/food'

/**
 * Food cards loaded from `src/content/foods.json`.
 * Edit that JSON file to change titles, clues, explanations and image paths.
 */
export const foods: FoodCard[] = raw.foods as FoodCard[]
