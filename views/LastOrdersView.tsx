import { FlatList, RefreshControl, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Orders from "../api/Orders";
import { Constants } from "expo/build/globals.web";
import { getOrderStatusColor, getOrderStatusTitle, ORDERS_SCREENS } from "../utils";
import * as Localization from "expo-localization";
import { formatToTimeZone } from "date-fns-timezone";
import OrderProductsRow from "../components/OrderProductsRow";

export default function LastOrdersView({ navigation }) {
  const [orders, setOrders] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const getOrders = async () => {
    try {
      const data = await Orders.lastOrders()
      setOrders(data.orders)
    } catch (e) {
      console.error('Cannot get orders', e)
    }
  }
  const refresh = async () => {
    setRefreshing(true)
    await getOrders()
    setRefreshing(false)
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
          style={{
            padding: 10,
          }}
          onPress={() => {
            showOrderDetails(item)
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
