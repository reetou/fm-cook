import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { ORDERS_SCREENS } from "../utils";
import OrderChatView from "../views/OrderChatView";
import NewOrdersView from "../views/NewOrdersView";
import NewOrderDetailsView from "../views/NewOrderDetailsView";
const Stack = createStackNavigator();

export default function Orders() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ORDERS_SCREENS.LIST}
        component={NewOrdersView}
        options={{
          title: 'Заказы'
        }}
      />
      <Stack.Screen
        name={ORDERS_SCREENS.DETAILS}
        component={NewOrderDetailsView}
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
