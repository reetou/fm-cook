import { Lunch } from "./types/Lunch";
import { Meal } from "./types/Meal";
import { formatToTimeZone } from "date-fns-timezone";
import * as Localization from "expo-localization";
import { User } from "./types/User";


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
  STRIPE_CHECKOUT: 'stripe_checkout',
  YANDEX_CHECKOUT: 'yandex_checkout',
  ADD_ADDRESS: 'add_address',
  BUY_CONTAINERS: 'buy_containers',
  LAST_ORDERS: 'last_orders',
  TILDA_SHOP: 'tilda_shop',
  CP_CHECKOUT: 'cloudpayments_checkout',
  GET_STARTED: 'get_started'
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

export function localizePlural(count: number, values: string[]) {
  const last = String(count)[String(count).length - 1]
  if (Number(last) === 1) return values[0]
  if ([2, 3, 4].includes(Number(last))) {
    if (count > 10 && count < 20) {
      return values[2]
    }
    return values[1]
  }
  return values[2]
}

export function localizePortions(portions: number) {
  return localizePlural(portions, ['порция', 'порции', 'порций'])
}

export const productItemDescription = (item: Meal & Lunch, options: ProductItemDescriptionOptions = {}): string => {
  let description = ''
  if (item.meals) {
    description = `${item.price} руб.`
    if (!options.hideAvailable) {
      description += `, ${item.available ? `${item.portions} ${localizePortions(item.portions)}` : 'порции закончились или недоступно'}`
    }
    if (!options.hideDiscount) {
      description += `, скидка ${item.discount_percent}%`
    }
  } else {
    description = `${item.price} руб.`
    if (!options.hidePortions) {
      description += `, ${item.portions} ${localizePortions(item.portions)}`
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
    case 'can_pickup':
      return 'Можно забирать'
    case 'delivering':
      return 'Доставляется'
    default:
      return String(status)
  }
}

export const getOrderStatusActionTitle = (status: string) => {
  switch (status) {
    case 'cooking':
      return 'Готовится'
    case 'completed':
      return 'Выполнить'
    case 'rejected':
      return 'Отклонить'
    case 'canceled':
      return 'Отменить'
    case 'accepted':
      return 'Принять'
    case 'created':
      return 'Создан'
    case 'can_pickup':
      return 'Можно забирать'
    case 'delivering':
      return 'Доставляется'
    default:
      return String(status)
  }
}

export const getOrderTypeTitle = (type: string) => {
  switch (type) {
    case 'delivery':
      return 'Доставка'
    case 'pickup':
      return 'Самовывоз'
    default:
      return String(type)
  }
}

export const getOrderCancelHistoryTitle = (cancel_history: number) => {
  if (cancel_history > 5) {
    return '⚠️ Часто отменяет заказы'
  }
  return ''
}

export const getNextOrderStatus = ({status, type}: {status: string, type: 'delivery' | 'pickup'}) => {
  switch (status) {
    case 'created':
      return 'accepted'
    case 'accepted':
      return 'cooking'
    case 'cooking':
      return type === 'delivery' ? 'delivering' : 'can_pickup'
    case 'can_pickup':
    case 'delivering':
      return 'completed'
  }
}

export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case 'cooking':
    case 'can_pickup':
    case 'delivering':
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

export const getOrderStatusColorType = (status: string): StatusColorType => {
  switch (status) {
    case 'rejected':
    case 'canceled':
      return 'danger'
    case 'completed':
      return 'success'
    case 'cooking':
    case 'can_pickup':
    case 'delivering':
    case 'accepted':
    case 'created':
    default:
      return 'info'
  }
}

export function formatThemeStyles(styles: any, componentName: string) {
  return Object
    .keys(styles)
    .filter(k => k.toLowerCase().includes(componentName))
    .map(k => {
      const withoutName = k.slice(componentName.length)
      const key = withoutName.slice(0, 1).toLowerCase() + withoutName.slice(1)
      const data = {
        [key]: styles[k]
      }
      return data
    })
    .reduce((prev, cur) => {
      return {
        ...prev,
        ...cur
      }
    }, {})
}

export const formatGiftedUser = (user) => ({
  ...user,
  _id: user.id,
  avatar: user.avatar_url,
  meals: [],
  lunches: [],
  address: null
})

export const CHAT_DISABLED_ORDER_STATUSES = ['rejected', 'canceled', 'completed']

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

const formatTimestamp = (ts: number) => {
  if (!ts) return 'error'
  return formatToTimeZone(ts * 1000, 'DD.MM HH:mm', { timeZone: Localization.timezone || 'Europe/Moscow' })
}

export const AVAILABLE_SUBSCRIPTION_STATUSES = ['active', 'trialing']

export function subscribeButtonTitle(status) {
  if (status) {
    return 'Получить доступ'
  }
  return 'Попробовать бесплатно'
}

export function subscriptionStatusTitle({subscription_status, active_until, trial_end}: User) {
  switch (subscription_status) {
    case 'active': return `Активно до ${formatTimestamp(active_until)}`
    case 'trialing': return `Активно до ${formatTimestamp(trial_end)}`
    default: return 'Надо продлить'
  }
}

export function subscriptionStatusColorName({subscription_status}: User) {
  switch (subscription_status) {
    case 'active':
    case 'trialing':
      return 'success'
    default: return 'warning'
  }
}

export function certificationStatusTitle({certified, certification_pending}: User) {
  if (certified) {
    return 'Пройдена'
  }
  if (certification_pending) {
    return 'На проверке'
  }
  return 'Не пройдена'
}

export function certificationStatusColorName({certified}: User) {
  if (certified) {
    return 'success'
  } else {
    return 'warning'
  }
}

export type StatusColorType = 'danger' | 'warning' | 'success' | 'info'

export function getErrorDetail(e: any) {
  if (e.response && e.response.data && e.response.data.errors && e.response.data.errors.detail) {
    return e.response.data.errors.detail
  }
  if (e.message) return e.message
  return 'Неизвестная ошибка'
}

export function getSubscribeButtonText(subscription_status: null | 'inactive' | 'trialing' | 'active') {
  switch (subscription_status) {
    case 'active':
    case 'trialing':
      return 'Вы можете работать'
    case 'inactive':
      return 'Продлить доступ'
    default:
      return 'Попробовать бесплатно'
  }
}
