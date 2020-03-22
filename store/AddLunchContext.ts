import React from 'react'
import { Meal } from "../types/Meal";

interface AddLunchContextProps {
  meals: Meal[];
  name: string;
  price: string;
  setName: (value: string) => void;
  setPrice: (value: string) => void;
  setMeals: (meals: any[]) => void;
}

export default React.createContext<AddLunchContextProps>({
  meals: [],
  name: '',
  price: '',
  setName: () => {},
  setPrice: () => {},
  setMeals: () => {},
})
