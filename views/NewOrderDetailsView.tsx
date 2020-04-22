import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Platform,
  Alert, ActionSheetIOS
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  AVAILABLE_SUBSCRIPTION_STATUSES,
  getErrorDetail,
  getNextOrderStatus, getOrderStatusActionTitle,
  getOrderStatusColorType,
  getOrderStatusTitle, getOrderTypeTitle, INACTIVE_ORDER_STATUSES, localizePortions,
  ORDERS_SCREENS
} from "../utils";
import Styleguide from "../Styleguide";
import Orders from "../api/Orders";
import useChannel from "../hooks/useChannel";
import UserContext from "../store/UserContext";
import * as Sentry from "sentry-expo";
import ListItemText from "./ListItemText";
import Section from "../components/Section";
import ActionButton from "../components/ActionButton";
import { size, uniqBy } from 'lodash-es'

const DEFAULT_ICON = require('../assets/icon.png')

export default function NewOrderDetailsView({ navigation, route: { params } }) {
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
      Sentry.captureException(e)
      console.error('Cannot update order', e)
      Alert.alert('Ошибка', getErrorDetail(e))
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
      Sentry.captureException(e)
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
  useEffect(() => {
    if (!order) return
    navigation.setOptions({
      title: order.slug.slice(0, 1).toUpperCase() + order.slug.slice(1)
    })
  }, [])
  const confirmReject = () => {
    const triggerAction = () => onUpdateOrder('rejected')
    const title = 'Вы уверены?'
    const message = 'Частые отказы от заказов могут привести к отключению от платформы'
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title,
          message,
          options: ['Отмена', 'Подтвердить'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            /* destructive action */
            triggerAction()
          }
        }
      )
    } else {
      Alert.alert(
        title,
        message,
        [
          { text: 'Назад', onPress: () => {} },
          { text: 'Подтвердить', onPress: triggerAction },
        ],
        { cancelable: true }
      )
    }
  }
  if (!order) return null
  const orderInactive = INACTIVE_ORDER_STATUSES.includes(order.status)
  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getDetails}
        />
      )}
      style={{
        paddingHorizontal: 24,
        backgroundColor: Styleguide.primaryBackgroundColor,
        flex: 1
      }}
    >
      <View>
        <ListItemText
          title={`${order.order_price} ₽`}
          text="Общая сумма заказа"
        />
        <ListItemText
          title={getOrderTypeTitle(order.type)}
          text="Тип заказа"
        />
        <ListItemText
          title={getOrderStatusTitle(order.status)}
          text="Статус заказа"
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 12,
          marginBottom: 4
        }}
      >
        Состав заказа
      </Text>
      <FlatList
        style={{
          marginVertical: 12,
          maxHeight: 150
        }}
        data={uniqBy(order.meals.concat(order.lunches), 'id')}
        keyExtractor={(item: any, index) => `${item.id}${index}`}
        horizontal
        renderItem={({item, index}) => {
          const portions = size(order.meals.concat(order.lunches).filter(v => v.id === item.id))
          return (
            <View>
              <Image
                source={item.image_url ? { uri: item.image_url } : DEFAULT_ICON}
                style={{
                  width: 140,
                  height: 90,
                  borderRadius: 12
                }}
              />
              <View style={{ marginTop: 10 }}>
                <Text adjustsFontSizeToFit style={{ fontSize: 13 }}>{item.name}</Text>
                <Text
                  adjustsFontSizeToFit
                  style={{ fontSize: 13, fontWeight: 'bold', color: Styleguide.secondaryColor }}
                  numberOfLines={1}
                >
                  {`${portions} ${localizePortions(portions)}`}
                </Text>
              </View>
            </View>
          )
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              marginHorizontal: 6,
            }}
          />
        )}
      />
      <Section
        title={`Чат с клиентом ${newMessages ? `(${newMessages})` : ''}`}
        style={{
          marginHorizontal: Platform.OS === 'ios' ? -10 : 0
        }}
        rightSide={(
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ORDERS_SCREENS.CHAT, {
                order_id: order.order_id
              })
            }}
            style={{
              justifyContent: 'center',
              margin: -30,
              padding: 20
            }}
          >
            <Image
              source={require('../assets/chat.png')}
              style={{
                width: 48,
                height: 48
              }}
            />
          </TouchableOpacity>
        )}
      />
      {
        !orderInactive
          ? (
            <View style={{ flexDirection: 'row', marginTop: 16 }}>
              <ActionButton
                color="warning"
                text="Отклонить"
                onPress={confirmReject}
                disabled={loading || !AVAILABLE_SUBSCRIPTION_STATUSES.includes(user.subscription_status)}
              />
              <ActionButton
                disabled={loading || !AVAILABLE_SUBSCRIPTION_STATUSES.includes(user.subscription_status)}
                color={getOrderStatusColorType(getNextOrderStatus(order))}
                text={getOrderStatusActionTitle(getNextOrderStatus(order))}
                onPress={() => onUpdateOrder(getNextOrderStatus(order))}
              />
            </View>
          )
          : null
      }
      <View style={{ marginBottom: 24 }} />
    </ScrollView>
  )
}
