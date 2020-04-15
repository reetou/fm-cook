import React, { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { formatGiftedUser, formatSupportMessage } from "../utils";
import Support from "../api/Support";
import UserContext from "../store/UserContext";
import useChannel from "../hooks/useChannel";
import * as Sentry from "sentry-expo";

export default function SupportChatView({ navigation }) {
  const [messages, setMessages] = useState<any[]>([])
  const { user } = useContext(UserContext)
  const [userChannel] = useChannel(`user:${user.id}`)
  const giftedUser = () => {
    return formatGiftedUser({
      ...user,
      name: 'Вы',
      id: 2,
    })
  }
  const onSend = useCallback((newMessages) => {
    setMessages(prevMessages => [...newMessages, ...prevMessages])
  }, [])
  useEffect(() => {
    if (!userChannel) {
      return
    }
    // @ts-ignore
    userChannel.on('support_message', ({ message }: any) => {
      const msg = formatSupportMessage(message, giftedUser())
      onSend([msg])
    })
  }, [userChannel])
  const getChatData = async () => {
    try {
      const data = await Support.getMessages()
      setMessages(
        data.messages.map(
          (m: any) => formatSupportMessage(m, giftedUser())
        )
      )
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get chat info', e)
    }
  }
  useEffect(() => {
    getChatData()
  }, [])
  return (
    <GiftedChat
      messages={messages}
      placeholder="Ваше сообщение..."
      onSend={sentMessages => {
        onSend(sentMessages)
        const msg = sentMessages[0]
        Support.sendMessage(msg.text)
      }}
      user={formatGiftedUser({
        ...user,
        name: 'Вы',
        id: 2
      })}
    />
  );
}
