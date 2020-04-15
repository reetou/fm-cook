import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import Subscription from "../api/Subscription";
import { API_HOST } from "../api";
import { PROFILE_SCREENS } from "../utils";
import { Alert } from 'react-native';
import * as Sentry from "sentry-expo";



export default function CheckoutView({ navigation }) {
  const [session, setSession] = useState<any>(null)

  const getSession = async () => {
    try {
      const data = await Subscription.checkout()
      setSession(data)
      console.log('Received session')
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get session', e)
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
        uri: `${API_HOST}/web_view/checkout?session_id=${session.id}&customer_id=${session.customer_id}`
      }}
      onLoadStart={onLoadStart}
    />
  );

};
