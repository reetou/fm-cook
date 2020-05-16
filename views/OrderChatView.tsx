import React, { useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Orders from "../api/Orders";
import {
  CHAT_DISABLED_ORDER_STATUSES,
  formatGiftedMessage,
  formatGiftedUser, getErrorDetail
} from "../utils";
import * as Sentry from "sentry-expo";
import { Alert } from "react-native";

export default function OrderChatView({ route: { params } }) {
  const [messages, setMessages] = useState<any[]>([])
  const [cooker, setCooker] = useState<any>(null)
  const [client, setClient] = useState<any>(null)
  const [order, setOrder] = useState<any>(null)
  const getChatData = async () => {
    try {
      const data = await Orders.getChatInfo(params.order_id)
      setCooker(data.order_members.cooker)
      setClient(data.order_members.client)
      setOrder(data.order)
      setMessages(data.messages.map((m: any) => formatGiftedMessage(m, data.order_members.cooker, data.order_members.client)))
    } catch (e) {
      Alert.alert('Ошибка', getErrorDetail(e))
      Sentry.captureException(e)
      console.error('Cannot get chat info', e)
    }
  }
  const sendMessage = async (sentMessages) => {
    try {
      const msg = sentMessages[0]
      setMessages([msg, ...messages])
      await Orders.sendMessage(order.order_id, msg.text)
    } catch (e) {
      Sentry.captureException(e)
      Alert.alert('Ошибка', getErrorDetail(e))
    }
  }
  useEffect(() => {
    getChatData()
  }, [])
  const user = cooker ? formatGiftedUser(cooker) : {_id: 1}
  const chatDisabled = order ? CHAT_DISABLED_ORDER_STATUSES.includes(order.status) : true
  return (
    <GiftedChat
      messages={messages}
      placeholder="Ваше сообщение..."
      maxInputLength={256}
      onSend={sendMessage}
      user={user}
      {...chatDisabled ? { renderInputToolbar: () => null } : {}}
    />
  )
}
