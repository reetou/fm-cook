import { Meal } from "./Meal";
import { Lunch } from "./Lunch";


export interface User {
  id: string;
  name: string | null;
  phone: string;
  verified: boolean;
  certified: boolean;
  suspended: boolean;
  meals: Meal[];
  lunches: Lunch[];
  address: any;
  pickup: boolean;
  delivery: boolean;
  avatar_url?: string;
  on_duty: boolean;
  description: string | null;
  subscription_status: string | null;
  active_until: number | null;
  trial_end: number | null;
}
