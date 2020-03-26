import React, { useContext, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { formatGiftedUser, formatSupportMessage } from "../utils";
import Support from "../api/Support";
import UserContext from "../store/UserContext";

export default function SupportChatView({ navigation }) {
  const [messages, setMessages] = useState<any[]>([])
  const { user } = useContext(UserContext)
  const getChatData = async () => {
    try {
      const data = await Support.getMessages()
      setMessages(data.messages.map((m: any) => formatSupportMessage(m, formatGiftedUser({
        ...user,
        name: 'Вы',
        id: 2,
      }))))
    } catch (e) {
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
        const msg = sentMessages[0]
        setMessages([msg, ...messages])
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
