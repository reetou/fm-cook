import { Meal } from "./Meal";

export interface Lunch {
  id?: string;
  name: string | null;
  image_url?: string | null;
  price: number | null;
  available?: boolean;
  ingredients?: string[];
  tags?: string[];
  discount_percent?: number;
  meals: Meal[];
}
