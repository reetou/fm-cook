import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import TermsView from "../views/TermsView";
import PrivacyPolicyView from "../views/PrivacyPolicyView";
const Stack = createStackNavigator();

export default function Documents() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="terms"
        component={TermsView}
        options={{
          title: 'Правила пользования'
        }}
      />
      <Stack.Screen
        name="privacy_policy"
        component={PrivacyPolicyView}
        options={{
          title: 'Конфиденциальность'
        }}
      />
    </Stack.Navigator>
  )
}
