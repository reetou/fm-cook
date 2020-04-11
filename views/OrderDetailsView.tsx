import { FlatList, View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, ListItem } from "@ui-kitten/components";
import {
  AVAILABLE_SUBSCRIPTION_STATUSES,
  CHAT_DISABLED_ORDER_STATUSES,
  getNextOrderStatus,
  getOrderStatusColor,
  getOrderStatusTitle, INACTIVE_ORDER_STATUSES,
  ORDERS_SCREENS
} from "../utils";
import Styleguide from "../Styleguide";
import OrderStatusButton from "../components/OrderStatusButton";
import Orders from "../api/Orders";
import useChannel from "../hooks/useChannel";
import UserContext from "../store/UserContext";

const DEFAULT_ICON = require('../assets/icon.png')

export default function OrderDetailsView({ navigation, route: { params } }) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [newMessages, setNewMessages] = useState<number>(0)
  const { user } = useContext(UserContext)
  const [orderChannel] = useChannel(`order:${order ? order.order_id : '_'}`)
  useEffect(() => {
    setOrder(params)
  }, [])
  const onUpdateOrder = async (status: string) => {
    if (!order) return
    setLoading(true)
    try {
      const data = await Orders.updateOrder(order.order_id, status)
      setOrder(data.order)
    } catch (e) {
      console.error('Cannot update order', e)
    }
    setLoading(false)
  }
  const getDetails = async () => {
    if (!order) return
    setLoading(true)
    setRefreshing(true)
    try {
      const data = await Orders.getOrderDetails(order.order_id)
      setOrder(data.order)
    } catch (e) {
      console.error('Cannot GET order details', e)
    }
    setLoading(false)
    setRefreshing(false)
  }
  useEffect(() => {
    if (!orderChannel) {
      return
    }
    // @ts-ignore
    orderChannel.on('message', (message: any) => {
      setNewMessages(prevMessages => prevMessages + 1)
    })
  }, [orderChannel])
  if (!order) return null
  const chatDisabled = loading || CHAT_DISABLED_ORDER_STATUSES.includes(order.status) || !AVAILABLE_SUBSCRIPTION_STATUSES.includes(user.subscription_status)
  const orderInactive = INACTIVE_ORDER_STATUSES.includes(order.status)
  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={getDetails}
      data={order.meals.concat(order.lunches)}
      keyExtractor={(item: any, index) => `${item.id}${index}`}
      ListHeaderComponent={() => (
        <View>
          <View style={{ marginVertical: 20 }}>
            <TouchableOpacity
              disabled={chatDisabled}
              style={{
                backgroundColor: chatDisabled ? Styleguide.tintColor : Styleguide.secondaryColor,
                paddingVertical: 12,
                marginHorizontal: 20,
                borderRadius: 20,
              }}
              onPress={() => {
                navigation.navigate(ORDERS_SCREENS.CHAT, {
                  order_id: order.order_id
                })
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: Styleguide.primaryBackgroundColor,
                }}
              >
                {`Чат ${newMessages ? `(${newMessages})` : ''}`}
              </Text>
            </TouchableOpacity>
          </View>
          <ListItem
            title={`${order.order_price} руб.`}
            description={'Общая сумма заказа'}
          />
          <ListItem
            title={order.type || 'Самовывоз'}
            description={'Тип заказа'}
          />
          <ListItem
            title={getOrderStatusTitle(order.status)}
            titleStyle={{
              color: getOrderStatusColor(order.status)
            }}
            description={'Статус заказа'}
          />
        </View>
      )}
      ListFooterComponent={(
        <View
          style={{
            marginBottom: 30
          }}
        >
          {
            orderInactive
              ? null
              : (
                <React.Fragment>
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 12,
                      color: 'gray',
                      textAlign: 'center'
                    }}
                  >
                    Нажмите на кнопку для изменения статуса заказа
                  </Text>
                  <OrderStatusButton
                    onPress={() => onUpdateOrder('rejected')}
                    order_id={order.order_id}
                    status={'rejected'}
                    disabled={loading || !AVAILABLE_SUBSCRIPTION_STATUSES.includes(user.subscription_status)}
                  />
                  <OrderStatusButton
                    onPress={() => onUpdateOrder(getNextOrderStatus(order.status))}
                    order_id={order.order_id}
                    status={getNextOrderStatus(order.status)}
                    disabled={loading || !AVAILABLE_SUBSCRIPTION_STATUSES.includes(user.subscription_status)}
                  />
                </React.Fragment>
              )
          }
        </View>
      )}
      renderItem={({item, index}) => (
        <View
          style={{
            marginTop: 10
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              size="giant"
              style={{
                width: 90,
                height: 90,
                marginRight: 10
              }}
              source={item.image_url ? { uri: item.image_url } : DEFAULT_ICON}
            />
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                fontSize: 16
              }}
            >
              {item.name || 'name'}
            </Text>
          </View>
        </View>
      )}
    />
  )
}
