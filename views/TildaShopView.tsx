import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

export default function TildaShopView({ navigation }) {
  return (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: 'http://borsch4cook.tilda.ws/'
      }}
    />
  );
};
