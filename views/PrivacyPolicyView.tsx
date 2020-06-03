import React from 'react';
import { WebView } from 'react-native-webview';

export default function PrivacyPolicyView() {
  return (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: 'https://cook.buhanka.app/privacy'
      }}
    />
  );
};
