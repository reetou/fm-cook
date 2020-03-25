import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { ORDERS_SCREENS } from "../utils";
import OrdersView from "../views/OrdersView";
import OrderDetailsView from "../views/OrderDetailsView";
import OrderChatView from "../views/OrderChatView";
const Stack = createStackNavigator();

export default function Orders() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ORDERS_SCREENS.LIST}
        component={OrdersView}
        options={{
          title: 'Заказы'
        }}
      />
      <Stack.Screen
        name={ORDERS_SCREENS.DETAILS}
        component={OrderDetailsView}
        options={{
          title: 'Детали'
        }}
      />
      <Stack.Screen
        name={ORDERS_SCREENS.CHAT}
        component={OrderChatView}
        options={{
          title: 'Чат'
        }}
      />
    </Stack.Navigator>
  )
}
