import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Styleguide from "./Styleguide";
import { TABS } from "./utils";
import { View, Text } from "react-native";
import Profile from "./screens/Profile";
import Products from "./screens/Products";
import Orders from "./screens/Orders";
import { PhoenixSocketProvider } from "./store/SocketContext";
import { API_HOST } from "./api";

// @ts-ignore
const wsUrl = `${API_HOST}/socket`

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <PhoenixSocketProvider wsUrl={wsUrl}>
      <Tab.Navigator
        backBehavior="initialRoute"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === TABS.PROFILE) {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === TABS.ORDERS) {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Styleguide.primaryColor,
          inactiveTintColor: Styleguide.tintColor,
        }}
      >
        <Tab.Screen
          name={TABS.PROFILE}
          component={Profile}
          options={{
            title: 'Профиль'
          }}
        />
        <Tab.Screen
          name={TABS.PRODUCTS}
          component={Products}
          options={{
            title: 'Блюда'
          }}
        />
        <Tab.Screen
          name={TABS.ORDERS}
          component={Orders}
          options={{
            title: 'Заказы'
          }}
        />
      </Tab.Navigator>
    </PhoenixSocketProvider>
  )
}
