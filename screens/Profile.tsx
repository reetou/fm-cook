import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { PROFILE_SCREENS } from "../utils";
import ProfileView from "../views/ProfileView";
import SupportChatView from "../views/SupportChatView";
import EditProfileView from "../views/EditProfileView";
import CheckoutView from "../views/CheckoutView";
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
      <Stack.Screen
        name={PROFILE_SCREENS.CHECKOUT}
        component={CheckoutView}
        options={{
          title: 'Чекаут'
        }}
      />
    </Stack.Navigator>
  )
}
