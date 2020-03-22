import { Lunch } from "./types/Lunch";
import { Meal } from "./types/Meal";


export const TABS = {
  PROFILE: 'profile',
  PRODUCTS: 'products',
  ORDERS: 'orders'
}

export const SCREENS = {
  MAIN_APP: 'main_app',
  SIGN_IN: 'sign_in',
  ONBOARDING: 'onboarding',
}

export const PRODUCTS_SCREENS = {
  LIST: 'products_list',
  ADD_MEAL: 'add_meal',
  ADD_LUNCH: 'add_lunch',
  ADD_PRODUCT: 'add_product',
  SELECT_MEALS: 'select_meals'
}

export const stringOrEmpty = (value, defaultValue = '') => {
  if (value !== null && value !== undefined) {
    return String(value)
  }
  return defaultValue
}

interface ProductItemDescriptionOptions {
  hideAvailable?: boolean;
  hideDiscount?: boolean;
  hidePortions?: boolean;
}


export const productItemDescription = (item: Meal & Lunch, options: ProductItemDescriptionOptions = {}): string => {
  let description = ''
  if (item.meals) {
    description = `${item.price} руб.`
    if (!options.hideAvailable) {
      description += `, ${item.available ? 'есть порции' : 'порции закончились'}`
    }
    if (!options.hideDiscount) {
      description += `, скидка ${item.discount_percent}%`
    }
  } else {
    description = `${item.price} руб.`
    if (!options.hidePortions) {
      description += `, ${item.portions} порций`
    }
    if (!options.hideAvailable) {
      description += `, ${item.available ? 'доступно для заказа' : 'нельзя заказать'}`
    }
  }
  return description
}
