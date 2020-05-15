import React, { useContext, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { API_HOST, API_ENDPOINT } from "../api";
import { getErrorDetail, PROFILE_SCREENS } from "../utils";
import { Alert } from 'react-native';
import * as Sentry from "sentry-expo";
import UserContext from "../store/UserContext";



export default function CloudPaymentsCheckoutView({ navigation }) {
  const { user } = useContext(UserContext)
  const onSuccessHandler = () => {
    navigation.goBack()
    Alert.alert('Ура!', 'Оплата прошла успешно. Рекомендуем перезапустить приложение')
  };
  const onCanceledHandler = () => {
    navigation.goBack()
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

  return (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: `${API_ENDPOINT}/web_view/cloudpayments/${user.id}`
      }}
      onLoadStart={onLoadStart}
    />
  );

};
