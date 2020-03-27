import { FlatList, RefreshControl, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Orders from "../api/Orders";
import { Constants } from "expo/build/globals.web";
import { getOrderStatusColor, getOrderStatusTitle, ORDERS_SCREENS } from "../utils";
import * as Localization from "expo-localization";
import { formatToTimeZone } from "date-fns-timezone";
import OrderProductsRow from "../components/OrderProductsRow";
import useChannel from "../hooks/useChannel";
import UserContext from "../store/UserContext";

export default function OrdersView({ navigation }) {
  const [orders, setOrders] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { user } = useContext(UserContext)
  const [cookerChannel] = useChannel(`cooker:${user.id}`)
  useEffect(() => {
    if (!cookerChannel) {
      return
    }
    cookerChannel.on('new_order', ({ order }: any): void => {
      const ids = orders.map(o => o.order_id)
      if (!ids.includes(order.order_id) && !refreshing) {
        setOrders(prevOrders => {
          return [...prevOrders, order]
        })
      }
    })
    cookerChannel.on('order_update', ({ order }: any): void => {
      setOrders(prevOrders => {
        return prevOrders.map(o => {
          if (o.order_id === order.order_id) {
            return order
          }
          return o
        })
      })
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
              <Text>{item.type || 'Самовывоз'}</Text>
              <Text>{formatToTimeZone(item.created_at, 'DD.MM HH:mm', { timeZone: Localization.timezone || 'Europe/Moscow' })}</Text>
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
