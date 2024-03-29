import { FlatList, RefreshControl, Text, TouchableHighlight, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Orders from "../api/Orders";
import Constants from "expo-constants";
import {
  getOrderCancelHistoryTitle,
  getOrderStatusColor,
  getOrderStatusTitle,
  getOrderTypeTitle,
  ORDERS_SCREENS
} from "../utils";
import * as Localization from "expo-localization";
import { formatToTimeZone } from "date-fns-timezone";
import OrderProductsRow from "../components/OrderProductsRow";
import useChannel from "../hooks/useChannel";
import UserContext from "../store/UserContext";
import * as Sentry from "sentry-expo";

export default function OrdersView({ navigation }) {
  const [orders, setOrders] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
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
  const refresh = async () => {
    setRefreshing(true)
    await getOrders()
    setRefreshing(false)
  }
  const getOrders = async () => {
    try {
      const { orders } = await Orders.getAll()
      setOrders(orders)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get orders', e)
    }
  }
  const showOrderDetails = (order: any) => {
    navigation.navigate(ORDERS_SCREENS.DETAILS, order)
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <FlatList
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
        />
      )}
      data={orders}
      keyExtractor={item => item.order_id}
      renderItem={({item, index}) => (
        <TouchableHighlight
          key={item.order_id}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => showOrderDetails(item)}
          style={{
            padding: 10,
          }}
        >
          <View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                {item.slug}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}
              >
                {`${item.order_price} руб.`}
              </Text>
              <Text
                style={{
                  color: getOrderStatusColor(item.status),
                  fontSize: 12,
                  fontWeight: 'bold'
                }}
              >
                {getOrderStatusTitle(item.status).toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text>{getOrderTypeTitle(item.type)}</Text>
              <Text>{formatToTimeZone(item.created_at, 'DD.MM HH:mm', { timeZone: Localization.timezone || 'Europe/Moscow' })}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text>{getOrderCancelHistoryTitle(item.cancel_history)}</Text>
            </View>
            <OrderProductsRow {...item} />
          </View>
        </TouchableHighlight>
      )}
      style={{ marginTop: Constants.statusBarHeight }}
      refreshing={refreshing}
      ListEmptyComponent={(
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text>Заказов пока нет</Text>
        </View>
      )}
    />
  )
}
