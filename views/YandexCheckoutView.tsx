import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import Kassa from "../api/Kassa";
import { API_HOST } from "../api";
import { getErrorDetail, PROFILE_SCREENS } from "../utils";
import { Alert } from 'react-native';
import * as Sentry from "sentry-expo";



export default function YandexCheckoutView({ navigation }) {
  const [session, setSession] = useState<any>(null)

  const getSession = async () => {
    try {
      const data = await Kassa.weeklyPlan()
      console.log('Data at session', data)
      setSession(data)
      console.log('Received session')
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get session', e)
      Alert.alert('Ошибка', getErrorDetail(e))
    }
  }

  const onSuccessHandler = () => {
    navigation.replace(PROFILE_SCREENS.MAIN)
    Alert.alert('Ура!', 'Оплата прошла успешно')
  };
  const onCanceledHandler = () => {
    navigation.replace(PROFILE_SCREENS.MAIN)
    Alert.alert('Ошибка', 'Оплата была отменена')
  };

  // Called everytime the URL stats to load in the webview
  const onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url.includes('success')) {
      onSuccessHandler();
      return;
    }
    if (nativeEvent.url.includes('cancel')) {
      onCanceledHandler();
    }
  };

  useEffect(() => {
    getSession()
  }, [])

  // Render
  if (!session) {
    return null;
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: session.confirmation_url
      }}
      onLoadStart={onLoadStart}
    />
  );

};
