import React from 'react'
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function AnimatedLogo() {
  return (
    <View
      style={{
        height: 130,
        alignItems: 'center',
      }}
    >
      <LottieView
        autoPlay
        loop={false}
        source={require('../assets/lottie/logo.json')}
      />
    </View>
  )
}
