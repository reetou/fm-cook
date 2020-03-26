import { AsyncStorage } from "react-native";

export const getToken = async () => {
  return AsyncStorage.getItem('token')
}

export const getSocketToken = async () => {
  return AsyncStorage.getItem('socketToken')
}
