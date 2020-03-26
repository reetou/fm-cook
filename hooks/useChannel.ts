import { useState, useContext, useEffect } from 'react'
import { PhoenixSocketContext } from '../store/SocketContext'

const useChannel = (channelName: string, onReply?: (v: any, socket: any) => void, explicitToken?: string) => {
  const [channel, setChannel] = useState(null);
  const { socket } = useContext(PhoenixSocketContext)

  const setupChannel = () => {
    const userToken = explicitToken
    const phoenixChannel = userToken ? socket.channel(channelName, { token: userToken }) : socket.channel(channelName)
    console.log(`Joining with optional user token ${userToken || 'NO_TOKEN'} to ${channelName}`)
    phoenixChannel
      .join()
      .receive('ok', (c) => {
        console.log('Joined successfully, cb is', c)
        setChannel(phoenixChannel)
        if (onReply) {
          onReply(c, socket)
        }
      })
      .receive('error', c => {
        console.error('Cannot connect: ', c)
      })
    return phoenixChannel
  }

  useEffect(() => {
    if (!socket) {
      return
    }
    const phoenixChannel = setupChannel()
    // leave the channel when the component unmounts
    return () => {
      console.log('Left channel')
      phoenixChannel.leave();
    };
  }, [socket])
  // only connect to the channel once on component mount
  // by passing the empty array as a second arg to useEffect

  return [channel];
};

export default useChannel;
