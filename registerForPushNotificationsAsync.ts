import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Push from "./api/Push";
import { Alert } from "react-native";

export default async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    Alert.alert('Ошибка', 'Вы не будете получать уведомления об изменениях заказов')
    return;
  }

  // Get the token that identifies this device
  const token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return Push.sendExpoToken(token)
}
