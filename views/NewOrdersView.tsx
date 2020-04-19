import { FlatList, RefreshControl, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Orders from "../api/Orders";
import {
  ORDERS_SCREENS
} from "../utils";
import useChannel from "../hooks/useChannel";
import UserContext from "../store/UserContext";
import * as Sentry from "sentry-expo";
import Styleguide from "../Styleguide";
import Constants from "expo-constants";
import OrderItem from "../components/OrderItem";
import SegmentedControl from "../components/SegmentedControl";

export default function OrdersView({ navigation }) {
  const [orders, setOrders] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const { user } = useContext(UserContext)
  const [cookerChannel] = useChannel(`cooker:${user.id}`)
  const onNewOrder = useCallback(order => {
    setOrders(prevOrders => [...prevOrders, order])
  }, [orders])
  const onUpdateOrder = useCallback(order => {
    setOrders(prevOrders => {
      return prevOrders.map(o => {
        if (o.order_id === order.order_id) {
          return order
        }
        return o
      })
    })
  }, [orders])
  useEffect(() => {
    if (!cookerChannel) {
      return
    }
    cookerChannel.on('new_order', ({ order }: any): void => {
      const ids = orders.map(o => o.order_id)
      if (!ids.includes(order.order_id) && !refreshing) {
        onNewOrder(order)
      }
    })
    cookerChannel.on('order_update', ({ order }: any): void => {
      onUpdateOrder(order)
    })
  }, [cookerChannel])
  const getOrders = async () => {
    setRefreshing(true)
    try {
      const data = await Orders.getAll()
      setOrders(data.orders)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get orders', e)
    }
    setRefreshing(false)
  }
  const getLastOrders = async () => {
    setRefreshing(true)
    try {
      const data = await Orders.lastOrders()
      setOrders(data.orders)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get last orders', e)
    }
    setRefreshing(false)
  }
  const showOrderDetails = (order: any) => {
    navigation.navigate(ORDERS_SCREENS.DETAILS, order)
  }
  const getOrdersForTab = () => {
    if (selectedIndex === 0) {
      getOrders()
    } else {
      getLastOrders()
    }
  }
  useEffect(() => {
    setOrders([])
    getOrdersForTab()
  }, [selectedIndex])
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 18,
        backgroundColor: Styleguide.primaryBackgroundColor
      }}
    >
      <View
        style={{
          marginTop: 12,
        }}
      >
        <SegmentedControl
          values={["Новые", "Все"]}
          selectedIndex={selectedIndex}
          onTabPress={setSelectedIndex}
        />
      </View>
      <FlatList
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getOrdersForTab}
          />
        )}
        data={orders}
        keyExtractor={item => item.order_id}
        renderItem={({item, index}) => (
          <OrderItem order={item} onPress={() => showOrderDetails(item)} />
        )}
        style={{ marginTop: Constants.statusBarHeight }}
        refreshing={refreshing}
        ListEmptyComponent={(
          <View
            style={{
              alignItems: 'center',
            }}
          >
            {refreshing ? <Text>Загрузка</Text> : <Text>Заказов пока нет</Text>}
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ marginVertical: 10 }} />
        )}
      />
    </View>
  )
}
