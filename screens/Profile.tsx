import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { ORDERS_SCREENS, PROFILE_SCREENS } from "../utils";
import ProfileView from "../views/ProfileView";
import SupportChatView from "../views/SupportChatView";
import EditProfileView from "../views/EditProfileView";
import AddAddressView from "../views/AddAddressView";
import BuyContainersView from "../views/BuyContainersView";
import LastOrdersView from "../views/LastOrdersView";
import OrderDetailsView from "../views/OrderDetailsView";
import YandexCheckoutView from "../views/YandexCheckoutView";
import TildaShopView from "../views/TildaShopView";
const Stack = createStackNavigator();

export default function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PROFILE_SCREENS.MAIN}
        component={ProfileView}
        options={{
          title: 'Профиль'
        }}
      />
      <Stack.Screen
        name={PROFILE_SCREENS.SUPPORT_CHAT}
        component={SupportChatView}
        options={{
          title: 'Поддержка'
        }}
      />
      <Stack.Screen
        name={PROFILE_SCREENS.EDIT_PROFILE}
        component={EditProfileView}
        options={{
          title: 'Редактировать'
        }}
      />
      {/*<Stack.Screen*/}
      {/*  name={PROFILE_SCREENS.STRIPE_CHECKOUT}*/}
      {/*  component={StripeCheckoutView}*/}
      {/*  options={{*/}
      {/*    title: 'Чекаут'*/}
      {/*  }}*/}
      {/*/>*/}
      <Stack.Screen
        name={PROFILE_SCREENS.YANDEX_CHECKOUT}
        component={YandexCheckoutView}
        options={{
          title: 'Чекаут'
        }}
      />
      <Stack.Screen
        name={PROFILE_SCREENS.TILDA_SHOP}
        component={TildaShopView}
        options={{
          title: 'Магазин'
        }}
      />
      <Stack.Screen
        name={PROFILE_SCREENS.ADD_ADDRESS}
        component={AddAddressView}
        options={{
          title: 'Адрес'
        }}
      />
      <Stack.Screen
        name={PROFILE_SCREENS.BUY_CONTAINERS}
        component={BuyContainersView}
        options={{
          title: 'Контейнеры'
        }}
      />
      <Stack.Screen
        name={PROFILE_SCREENS.LAST_ORDERS}
        component={LastOrdersView}
        options={{
          title: 'История заказов'
        }}
      />
      <Stack.Screen
        name={ORDERS_SCREENS.DETAILS}
        component={OrderDetailsView}
        options={{
          title: 'Детали'
        }}
      />
    </Stack.Navigator>
  )
}
