import React, { useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Orders from "../api/Orders";
import { formatGiftedMessage, formatGiftedUser } from "../utils";

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
      console.error('Cannot get chat info', e)
    }
  }
  useEffect(() => {
    getChatData()
  }, [])
  const user = cooker ? formatGiftedUser(cooker) : {_id: 1}
  return (
    <GiftedChat
      messages={messages}
      placeholder="Ваше сообщение..."
      onSend={sentMessages => {
        const msg = sentMessages[0]
        setMessages([msg, ...messages])
        Orders.sendMessage(order.order_id, msg.text)
      }}
      user={user}
    />
  )
}
