import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import PhoneView from "../views/PhoneView";
import CodeView from "../views/CodeView";
import { useKeepAwake } from "expo-keep-awake";

const Stack = createStackNavigator();

export default function SignIn() {
  useKeepAwake()
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="phoneSignIn" component={PhoneView} />
      <Stack.Screen name="codeSignIn" component={CodeView} />
    </Stack.Navigator>
  )
}
