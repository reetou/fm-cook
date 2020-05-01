import * as Permissions from 'expo-permissions';
import { Alert } from "react-native";

export default async function askCameraRollPermission(): Promise<boolean> {
  const data = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  if (data.status === 'denied') {
    Alert.alert('Ошибка', `Не получено разрешение на доступ к галерее`)
    return false;
  }

  return true
}
