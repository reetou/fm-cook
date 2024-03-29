import React from 'react';
import { WebView } from 'react-native-webview';

export default function TermsView() {
  return (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: 'https://cook.buhanka.app/terms'
      }}
    />
  );
};
