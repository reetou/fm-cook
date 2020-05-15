import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { ORDERS_SCREENS, PROFILE_SCREENS } from "../utils";
import SupportChatView from "../views/SupportChatView";
import EditProfileView from "../views/EditProfileView";
import AddAddressView from "../views/AddAddressView";
import OrderDetailsView from "../views/OrderDetailsView";
import YandexCheckoutView from "../views/YandexCheckoutView";
import TildaShopView from "../views/TildaShopView";
import NewProfileView from "../views/NewProfileView";
import CloudPaymentsCheckoutView from "../views/CloudPaymentsCheckoutView";
import GetStartedView from "../views/GetStartedView";
import { Platform } from "react-native";
const Stack = createStackNavigator();

export default function Profile() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...Platform.OS === 'ios' ? TransitionPresets.ModalPresentationIOS : TransitionPresets.ScaleFromCenterAndroid,
      }}
    >
      <Stack.Screen
        name={PROFILE_SCREENS.MAIN}
        component={NewProfileView}
        options={{
          headerShown: false,
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
        name={PROFILE_SCREENS.CP_CHECKOUT}
        component={CloudPaymentsCheckoutView}
        options={{
          title: 'Оплата'
        }}
      />
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
        name={PROFILE_SCREENS.GET_STARTED}
        component={GetStartedView}
        options={{
          title: 'Быстрый старт',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
