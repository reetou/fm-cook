import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Styleguide from "./Styleguide";
import { TABS } from "./utils";
import { View, Text, Image } from "react-native";
import Profile from "./screens/Profile";
import Products from "./screens/Products";
import Orders from "./screens/Orders";
import { PhoenixSocketProvider } from "./store/SocketContext";
import { API_HOST } from "./api";
// @ts-ignore
import ProductsIcon from './assets/products.svg'
// @ts-ignore
import ProfileIcon from './assets/profile.svg'


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
            const getIcon = (name, props) => {
              switch (name) {
                case TABS.PROFILE:
                  return <ProfileIcon {...props} />
                case TABS.PRODUCTS:
                  return <ProductsIcon {...props} />
                case TABS.ORDERS:
                  return <ProfileIcon {...props} />
              }
            }
            return getIcon(route.name, {
              width: size,
              height: size,
              fill: focused ? Styleguide.tabActiveColor : Styleguide.tabColor,
            })
          },
        })}
        tabBarOptions={{
          activeTintColor: Styleguide.listItemButtonTextColor,
          inactiveTintColor: 'black',
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
