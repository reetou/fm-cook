import { Meal } from "./Meal";
import { Lunch } from "./Lunch";


export interface User {
  id: string;
  name: string | null;
  phone: string;
  verified: boolean;
  certified: boolean;
  meals: Meal[];
  lunches: Lunch[];
  pickup: boolean;
  delivery: boolean;
  avatar_url?: string;
  on_duty: boolean;
  description: string | null;
}
