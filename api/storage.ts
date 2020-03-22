import { AsyncStorage } from "react-native";

export const getToken = async () => {
  return AsyncStorage.getItem('token')
}
