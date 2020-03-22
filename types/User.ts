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
  on_duty: boolean;
  description: string | null;
}
