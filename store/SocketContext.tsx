import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
// @ts-ignore
import {Socket} from 'phoenix'
import UserContext from "./UserContext";

const PhoenixSocketContext = createContext({
  socket: null,
  token: '',
})

interface PhoenixSocketProviderProps {
  wsUrl: string;
  children: ReactNode
}

const PhoenixSocketProvider = ({ children, wsUrl }: PhoenixSocketProviderProps) => {
  const [socket, setSocket] = useState(null)
  const { socketToken } = useContext(UserContext)

  useEffect(() => {
    if (!socketToken) {
      console.warn('No socket token provided')
      return
    }
    if (socket) {
      // @ts-ignore
      socket.disconnect()
    }
    const socketClient = new Socket(wsUrl, { params: { token: socketToken } })
    socketClient.onOpen(event => console.log('Connected.'))
    socketClient.onError(event => console.log('Cannot connect.', event))
    socketClient.onClose(event => console.log('Goodbye.'))
    socketClient.connect()
    setSocket(socketClient)
  }, [socketToken])

  return (
    <PhoenixSocketContext.Provider value={{ socket, token: socketToken }}>
      {children}
    </PhoenixSocketContext.Provider>
  )
}

export { PhoenixSocketContext, PhoenixSocketProvider };
