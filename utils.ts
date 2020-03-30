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

export const ORDERS_SCREENS = {
  LIST: 'orders_list',
  DETAILS: 'order_details',
  CHAT: 'order_chat'
}

export const PROFILE_SCREENS = {
  MAIN: 'profile_main',
  SUPPORT_CHAT: 'profile_support_chat',
  EDIT_PROFILE: 'profile_edit',
  CHECKOUT: 'checkout'
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

export const getOrderStatusTitle = (status: string) => {
  switch (status) {
    case 'cooking':
      return 'Готовится'
    case 'completed':
      return 'Выполнен'
    case 'rejected':
      return 'Отклонен'
    case 'canceled':
      return 'Отменен'
    case 'accepted':
      return 'В работе'
    case 'created':
      return 'Создан'
    default:
      return String(status)
  }
}

export const getNextOrderStatus = (status: string) => {
  switch (status) {
    case 'created':
      return 'accepted'
    case 'accepted':
      return 'cooking'
    case 'cooking':
      return 'completed'
  }
}

export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case 'cooking':
      return 'orange'
    case 'rejected':
      return 'red'
    case 'canceled':
      return 'red'
    case 'completed':
      return 'violet'
    case 'accepted':
      return 'green'
    case 'created':
      return 'purple'
    default:
      return 'black'
  }
}

export const formatGiftedUser = (user) => ({
  ...user,
  _id: user.id,
  avatar: user.avatar_url,
  meals: [],
  lunches: [],
  address: null
})

export const CHAT_DISABLED_ORDER_STATUSES = ['rejected', 'canceled', 'completed', 'created']

export const INACTIVE_ORDER_STATUSES = ['rejected', 'canceled', 'completed']

export const formatGiftedMessage = (message: any, cooker: any, client: any) => {
  return {
    text: message.text,
    _id: message.id,
    createdAt: message.sent_at,
    user: message.from === cooker.id ? formatGiftedUser(cooker) : formatGiftedUser(client),
  }
}

export const formatSupportMessage = (message: any, user: any) => {
  return {
    text: message.text,
    _id: message.id,
    createdAt: message.sent_at,
    user: message.from_support ? {
      _id: 1,
      name: 'Поддержка',
      avatar: null
    } : {
      ...user,
      _id: 2
    },
  }
}

export const AVAILABLE_SUBSCRIPTION_STATUSES = ['active', 'trialing']

export function subscribeButtonTitle(status) {
  if (status) {
    return 'Оформить подписку'
  }
  return 'Оформить пробный период'
}

export function subscriptionStatusTitle(status) {
  switch (status) {
    case null: return 'Доступен пробный период'
    case 'active': return 'Активна'
    case 'trialing': return 'Активен пробный период'
    case 'unpaid': return 'Не оплачена'
    default: return 'Не оформлена'
  }
}
