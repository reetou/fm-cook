export interface Meal {
  id?: string;
  name: string | null;
  image_url?: string | null;
  description?: string | null;
  price: number | null;
  weight?: number | null;
  calories?: number | null;
  cook_time?: number | null;
  type?: string | null;
  available?: boolean;
  ingredients?: string[];
  portions?: number;
  tags?: string[];
}
